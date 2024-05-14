pipeline {
  agent any
  environment {
    APP_NAME = "show-app"
    RELEASE = "1.0.0"
    DOCKER_USER = "mdhiadhia"
    DOCKER_PASS = "96960c3a-cad3-4634-a354-c160f12da0d9"
    IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
    IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
    // JENKINS_API_TOKEN = credentials("JENKINS_API_TOKEN")
  }

  stages {
    stage("Install Dependencies") {
      steps {
        sh "npm install" // Install dependencies
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build' // Build Angular app
      }
    }

    stage("Build & Push Docker Image") {
      steps {
        script {
          // Build Docker image
          sh "docker build -t ${IMAGE_NAME} ."
            
          // Login to Docker Hub
          sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
            
          // Push Docker image
          sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
          sh "docker push ${IMAGE_NAME}:latest"
        }
      }
    }

    // Uncomment if needed later
    /*
    stage("Test Application") {
      steps {
        sh "npm test" // Run tests
      }
    }

    stage('Dockerize') {
      steps {
        script {
          def dockerImage = docker.build('my-angular-app', '-f Dockerfile .')
          // dockerImage.run("-p 4200:80").detached()
        }
      }
    }

    stage("Trivy Scan") {
      steps {
        script {
          sh 'docker run -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image my-angular-app:latest --no-progress --scanners vuln --exit-code 0 --severity HIGH,CRITICAL --format table'
        }
      }
    }
    */
  }
}
