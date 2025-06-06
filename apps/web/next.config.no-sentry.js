// No need for withClerk in Clerk v5+ - it's been removed

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Skip ESLint during builds for now to test Sentry integration
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['your-image-domain.com'], // Replace with your image domains
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.vercel.app'],
    },
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
};

module.exports = nextConfig;
