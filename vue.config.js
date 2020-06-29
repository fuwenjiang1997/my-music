const path = require('path');

function resolveDir(dir){
  return path.join(__dirname,dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('components', resolveDir('./src/components'))
      .set('views',resolveDir('./src/views'))
    config.devServer.proxy({

    })
  },

  devServer: {
    open: false,
    host: '0.0.0.0',
    https: false,
    proxy: {
      '/qqApi': {
        target: 'http://localhost:3200',
        changeOrigin: true,
        pathRewrite: {
          '^/qqApi': ''
        }
      }
    }
  }
}