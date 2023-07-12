/** @type {import('next').NextConfig} */
const path = require('path');

const rewrites = () => {
  return [
    {
      source: '/v1/admin/api/',
      destination: 'http://localhost:5000/v1/admin/api/',
    },
  ];
};
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  env: {
    REACT_APP_API_UPLOADS: process.env.REACT_APP_API_UPLOADS,
    REACT_APP_WEB_PUSH_PUBLIC_KEY: process.env.REACT_APP_WEB_PUSH_PUBLIC_KEY,
    BACKEND_API_URL: '/v1/admin/api/',
  },
  rewrites,
};

module.exports = () => {
  return nextConfig;
};
