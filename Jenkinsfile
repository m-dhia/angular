pipeline {
  agent any

  environment {
    APP_NAME = "app-pipeline"
    RELEASE = "1.0.0"
    DOCKER_USER = "mdhiadhia"
    DOCKER_PASS = 'dockerhub'
    IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
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

 stage('SonarQube Analysis') {
      steps {
        script {
          def scannerHome = tool 'SonarScanner';
          withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    }
    

    stage("Build & Push Docker Image") {
      steps {
        script {
          docker.withRegistry('', DOCKER_PASS) {
            def docker_image = docker.build "${IMAGE_NAME}:${IMAGE_TAG}"
            docker_image.push()
            docker_image.push("latest")
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
