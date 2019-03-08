pipeline {
    agent any
    options {
      timeout(time: 1, unit: 'HOURS')
    }

    stages {
        stage('Prepare') {
          steps {
            sh 'npm install -g yarn'
            sh 'yarn install'
          }
        }
        stage('Build') {
            steps {
                sh 'yarn compile'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
    }

    post {
      always {
        echo 'Done building and testing.'
      }
    }
}
