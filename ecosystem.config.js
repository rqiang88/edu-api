module.exports = {
  apps: [
    {
      name: 'edu-api',
      script: 'node build/main.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'rxq',
      host: '49.234.181.173',
      ref: 'origin/master',
      repo: 'https://github.com/rqiang88/edu-api.git',
      path: '/home/rxq/node/edu-api',
      'pre-deploy-local': '',
      'post-deploy':
        'yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
