/**
 * Created by sampson on 2017/5/7.
 */
module.exports = {
    apps: [
        {
            name: 'score',
            script: './server.js',
            kill_timeout: 3000,
            instances: 2,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                HOST: '0.0.0.0',
                ADDRESS: 'ews.500.com'
            },
            env_release: {
                // ADDRESS: '43.247.69.20'
                ADDRESS: '172.30.10.133'
            },
            env_pre: {
                ADDRESS: '43.247.69.20'
            },
            env_dev: {
                ADDRESS: '10.0.1.31'
            }
        }
    ]
}
