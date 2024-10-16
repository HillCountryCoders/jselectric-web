/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://www.jselectricapp.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
