/** @type {import { 'next' }.NextConfig} */
module.exports = {
    images: {
      domains: ['assets.aceternity.com','images.unsplash.com','pbs.twimg.com','aceternity.com','images.remotePatterns','orgurix.vercel.app'],
      formats:['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.vercel.com',
          port: '',
          pathname: '/image/upload/**',
        },
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
          port: '',
          pathname: '/image/upload/**',
        },
      ],
    },
  }