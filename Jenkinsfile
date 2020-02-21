def npm_registry = 'https://registry.npm.taobao.org'

pipeline {
  agent {
    docker { 
        image 'node:10-alpine'
    }
  }

  stages {
    stage("检出") {
      steps {
        checkout(
          [$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], 
          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]]
        )
      }
    }
        
    stage('Prepare') {
      steps {
        sh """
          yarn config set registry ${npm_registry}
          yarn
        """
      }
    }
    
    stage('Test') {
      steps {
        sh """
          CI=true yarn test
        """
      }
    }
    
    stage('Lint') {
      steps {
        sh """
          yarn lint
        """
      }
    }
    
    stage('Build') {
      steps {
        sh """
          yarn build
        """
      }
    }
  }
}

