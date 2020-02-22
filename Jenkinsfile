def npm_registry = 'https://registry.npm.taobao.org'

dockerServer = "mdeditor-docker.pkg.coding.net"

pipeline {
  agent any

  stages {
    stage('Checkout') {
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

    stage('Unit Test') {
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

    stage('Build Docker Image') {
      steps {
        script {
          imageName = "${dockerServer}/md-editor/website/frond-end:latest"
          docker.build(imageName)
        }
      }
    }

    stage('E2E Test') {
      steps {
        script {
          docker.image(imageName).withRun('-p 3000:80') {
            sh 'docker run --network="host" -v $PWD:/e2e -w /e2e cypress/included:4.0.2'
          }
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://mdeditor-docker.pkg.coding.net/md-editor/website', CODING_ARTIFACTS_CREDENTIALS_ID) {
            docker.image(imageName).push()
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          def remote = [:]
          remote.name = 'web-server'
          remote.allowAnyHosts = true
          remote.host = 'codingstyle.cn'
          remote.user = 'ruby'

          dockerUser = ""
          dockerPassword = ""

          // 获取内置的制品库凭证
          withCredentials([usernamePassword(credentialsId: env.CODING_ARTIFACTS_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
            dockerUser = DOCKER_USER
            dockerPassword = DOCKER_PASSWORD
          }

          // 需要先创建一对密钥，把私钥放在 CODING 凭据管理，把公钥放在服务器的 `.ssh/authorized_keys`，实现 SSH 免密码登录
          withCredentials([sshUserPrivateKey(credentialsId: "17331d26-5da9-4423-a04b-520f90c59bf7", keyFileVariable: 'id_rsa')]) {
            remote.identityFile = id_rsa

            // SSH 连接到远端服务器，拉取 Docker 镜像
            sshCommand remote: remote, command: "docker login -u ${dockerUser} -p ${dockerPassword} ${dockerServer}"
            sshCommand remote: remote, command: "docker pull ${imageName}"
            sshCommand remote: remote, command: "docker stop web | true"
            sshCommand remote: remote, command: "docker rm web | true"
            sshCommand remote: remote, command: "docker run --name web -p 9000:80 -d ${imageName}"
          }
        }
      }
    }
  }
}
