/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    typedRoutes: false,
  },
}

module.exports = nextConfig