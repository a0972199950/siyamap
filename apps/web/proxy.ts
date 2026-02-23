import { chain, FunctionFactory } from '@/utils/chain'
import { NextRequest, NextResponse, NextProxy } from 'next/server'

const DEV_ONLY_ROUTES = ['/api-doc']
const withDevOnly: FunctionFactory<NextProxy> = (nextProxy: NextProxy) => {
  const currentProxy: NextProxy = async (request: NextRequest, _event) => {
    const { pathname } = request.nextUrl

    if (
      DEV_ONLY_ROUTES.some(route => pathname.startsWith(route)) && // 該路由符合只有開發環境能訪問
      process.env.NODE_ENV !== 'development' // 目前不是開發環境
    ) {
      return new NextResponse(null, { status: 404 })
    }

    return nextProxy(request, _event)
  }

  return currentProxy
}

// 這裡的順序決定了執行的優先級
export default chain([withDevOnly], 0, () => NextResponse.next())

export const config = {
  // 匹配所有路徑，由內部的邏輯自行判斷是否攔截
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
