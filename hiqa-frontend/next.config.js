/** @type {import('next').NextConfig} */
const path = require('path');

const rewrites = () => {
  return [
    {
      source: '/v1/front/api/',
      destination: 'http://localhost:5000/v1/front/api/',
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
    BACKEND_API_URL: '/v1/front/api/',
    RAZORPAY_KEY: 'rzp_test_o4ORT3Ja0YEpq8',
    RAZORPAY_KEY_SECRET: 'P0PtN5LFpx1vkyomlmLJDqLu',
    COMPANY_NAME: 'HIQA PVT LTD',
  },
  rewrites,
};

module.exports = () => {
  return nextConfig;
};
