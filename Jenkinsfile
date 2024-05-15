pipeline {
  agent any

  environment {
    APP_NAME = "app-pipeline"
    RELEASE = "1.0.0"
    DOCKER_USER = "mdhiadhia"
    DOCKER_PASS = 'dockerhub'
    IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
    IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
  }

  stages {
    stage("Install Dependencies") {
      steps {
        sh "npm install"
      }
    }

    stage('Build the app') {
      steps {
        sh 'npm run build'
      }
    }
stage('SonarQube Code Analysis') {
            steps {
                dir("${WORKSPACE}"){
                // Run SonarQube analysis for Python
                script {
                    def scannerHome = tool name: 'scanner-name', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('sonar') {
                        sh "echo $pwd"
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
            }
       }
      stage('SonarQube Scan') {
            steps {
                script {
                    // Use the SonarQube Scanner plugin
                    withSonarQubeEnv('sonarqube-server') {
                        sh "sonar-scanner -Dsonar.projectKey=${params.SONAR_PROJECT_KEY}"
                    }
                }
            }
        }

    
    stage("Build & Push Docker Image") {
      steps {
        script {
          docker.withRegistry('', DOCKER_PASS) {
            docker_image = docker.build "${IMAGE_NAME}"
          }

          docker.withRegistry('', DOCKER_PASS) {
            docker_image.push("${IMAGE_TAG}")
            docker_image.push('latest')
          }
        }
      }

    }

    stage('Trivy Scan') {
      steps {
        script {
          def timestamp = sh(script: "date +'%S-%M-%H-%d-%m-%Y'", returnStdout: true).trim()
          sh "touch TrivyLogs-${timestamp}.txt"
          sh "trivy ${IMAGE_NAME}:${IMAGE_TAG} > TrivyLogs-${timestamp}.txt"
        }
      }
    }

  }
}
