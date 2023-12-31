const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // API isteklerini yakalayacak yol
    createProxyMiddleware({
      target: 'http://localhost:7272', // Yönlendirilecek sunucu adresi
      changeOrigin: true,
    })
  );
};
