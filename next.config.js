/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    
    // Enable experimental features
    experimental: {
      mdxRs: false, // Use the JS-based MDX compiler for better compatibility
    },
  
    // Image optimization
    images: {
      formats: ['image/avif', 'image/webp'],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
  
    // Headers for security and performance
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()',
            },
          ],
        },
      ]
    },
  
    // Redirects
    async redirects() {
      return [
        {
          source: '/posts/:slug*',
          destination: '/blog/:slug*',
          permanent: true,
        },
      ]
    },
  
    // Enable static exports capability for future deployment options
    trailingSlash: false,
    
    // Bundle analyzer (optional)
    webpack: (config, { dev, isServer }) => {
      // Performance optimizations
      if (!dev && !isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        }
      }
      
      return config
    },
  }
  
  // Use dynamic import for MDX
  const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  })
  
  module.exports = withMDX(nextConfig)