import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@siyamap/ui'],
  output: 'standalone',
  typescript: {
    // ⚠️ 這會讓 build 時忽略 TypeScript 錯誤
    // 危險：只有在確信 TypeScript 錯誤不會影響運行時才使用
    ignoreBuildErrors: true,
  },
}

export default nextConfig
