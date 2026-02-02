/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/products/:tool/:path*',
        destination: 'https://:tool.vercel.app/:path*'
      }
    ]
  }
};

module.exports = nextConfig;
