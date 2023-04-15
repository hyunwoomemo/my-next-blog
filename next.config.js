/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withWorkbox = require('next-with-workbox');
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.BASE_URL,
  },
  images: {
    domains: [
      'www.notion.so',
      'images.unsplash.com',
      's3.us-west-2.amazonaws.com'
    ],
    format: ['image/png', 'image/webp', 'image/jpeg']
  },
}

module.exports = withPlugins(
  [
    withPWA,
    {
      pwa: {
        dest: "public",
      },
    },
  ],
  // 추가 플러그인 작성
  [
    withWorkbox,
    {
      dest: 'public',
      swDest: 'sw.js',
      swSrc: 'worker.js',
      force: true,
    }
  ]
  ,
  nextConfig
);
