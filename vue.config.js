const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      'preProcessor': 'scss',
      'patterns': [
        path.resolve(__dirname, './src/styles/*.scss'),
      ]
    }
  },
  devServer: {
    proxy: {
      "/reed": {
        target: 'https://www.reed.co.uk',
        changeOrigin: true,
        pathRewrite: {
          "^/reed": ""
        }
      },
      "/glassdoor": {
        target: 'https://api.glassdoor.com',
        changeOrigin: true,
        pathRewrite: {
          "^/glassdoor": ""
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue$', path.join(__dirname, 'node_modules/vue'));
  }
};