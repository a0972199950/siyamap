import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@siyamap/ui'],
  output: 'standalone',
  assetPrefix: 'https://cdn.siyamap.com',
}

export default nextConfig
