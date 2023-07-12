/** @type {import('next').NextConfig} */
const path = require('path');

const rewrites = () => {
  return [
    {
      source: '/v1/api/',
      destination: process.env.BACKEND_URL+'/v1/api/',
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
  },
  rewrites,
};

module.exports = () => {
  return nextConfig;
};
