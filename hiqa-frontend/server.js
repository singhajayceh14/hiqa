// server.js
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = !dev ? 'redlandsbackend.azurewebsites.net' : process.env.HOSTNAME;
const port = process.env.PORT || 3002;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    '/v1/api',
    createProxyMiddleware({
      target: process.env.BACKEND_URL,
      changeOrigin: true,
    }),
  );
  server.all('*', (req, res) => handle(req, res));
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://${process.env.HOSTNAME}:${port} and production is ${dev}`);
  });
});
