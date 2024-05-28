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

    stage('OWASP Dependency-Check Vulnerabilities') {
      steps {
        dependencyCheck additionalArguments: ''
        '  -
        o './' -
          s './' -
          f 'ALL'
          --prettyPrint ''
        ', odcInstallation: '
        OWASP Dependency - Check Vulnerabilities '

        dependencyCheckPublisher pattern: 'dependency-check-report.xml'
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

    stage('Build Docker Image') {
      steps {
        script {
          // Build the Docker image
          docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
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

    stage('Push Docker Image') {
      steps {
        script {
          // Push the Docker image to the registry
          docker.withRegistry('', DOCKER_PASS) {
            def dockerImage = docker.image("${IMAGE_NAME}:${IMAGE_TAG}")
            dockerImage.push()
            dockerImage.push('latest')
          }
        }
      }
    }

    stage('Deploy with Ansible') {
      steps {
        script {
          // Run Ansible playbook for deployment
          sh "ansible-playbook playbook.yml"
        }
      }
    }

  }
}