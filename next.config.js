/** @type {import('next').NextConfig} */
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
    [
      withPWA,
      {
        pwa: {
          dest: "public",
        },
      },
    ],
    // 추가 플러그인 작성
  ],
  nextConfig
);
