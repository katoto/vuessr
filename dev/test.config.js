/**
 * Created by sampson on 2017/5/7.
 */
module.exports = {
    apps: [
        {
            name: 'dev_test_score',
            script: './server.js',
            kill_timeout: 3000,
            instances: 1,
            env: {
                NODE_ENV: 'development',
                PORT: 3001,
                HOST: '0.0.0.0',
                ADDRESS: '10.0.1.31'
            }
        }
    ]
}
