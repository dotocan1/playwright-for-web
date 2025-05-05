/* Requires the Docker Pipeline plugin */
pipeline {
    agent { docker { image 'node:22.15.0-alpine3.21' } }
    triggers {
        // run every 2 days on even days only
        cron('* * */2 * *')
    }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}
