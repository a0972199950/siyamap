import { NextResponse } from 'next/server'
import type { NextProxy, NextRequest } from 'next/server'
import { MiddlewareFactory } from '@/utils/middleware-chain'

const DEV_ONLY_ROUTES = ['/api-doc']

export const withDevOnly: MiddlewareFactory = (nextMiddleware: NextProxy) => {
  const currentMiddleware: NextProxy = async (request: NextRequest, _event) => {
    const { pathname } = request.nextUrl

    if (
      DEV_ONLY_ROUTES.some(route => pathname.startsWith(route)) && // 該路由符合只有開發環境能訪問
      process.env.NODE_ENV !== 'development' // 目前不是開發環境
    ) {
      return new NextResponse(null, { status: 404 })
    }

    return nextMiddleware(request, _event)
  }

  return currentMiddleware
}
