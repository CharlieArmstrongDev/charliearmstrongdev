// Updated to use the correct Clerk import path for v5+ of @clerk/nextjs
const { withClerk } = require('@clerk/nextjs');

module.exports = withClerk({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-image-domain.com'], // Replace with your image domains
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/trpc/:path*', // Proxy to the tRPC API
      },
    ];
  },
});