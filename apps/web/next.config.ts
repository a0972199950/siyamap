import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@siyamap/ui'],
  output: 'standalone',
}

export default nextConfig
