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

 stage('Scan') {
            steps {
                script {
                    docker.image('my-scanner-new').inside('-v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""') {
                        sh "/usr/local/bin/sonar-scanner"
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
