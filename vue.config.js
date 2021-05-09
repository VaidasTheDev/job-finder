module.exports = {
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
  }
};