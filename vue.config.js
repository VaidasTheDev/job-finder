module.exports = {
  devServer: {
    proxy: {
      "/reed": {
        target: 'https://www.reed.co.uk',
        changeOrigin: true,
        pathRewrite: {
          "^/reed": ""
        }
      }
    }
  }
};