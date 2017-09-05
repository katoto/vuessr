/**
 * Created by sampson on 2017/5/7.
 */
module.exports = {
    apps: [
        {
            name: 'dev_prod_score',
            script: './server.js',
            kill_timeout: 3000,
            instances: 1,
            env: {
                NODE_ENV: 'development',
                PORT: 3003,
                HOST: '0.0.0.0',
                ADDRESS: 'ews.500.com'
            }
        }
    ]
}
