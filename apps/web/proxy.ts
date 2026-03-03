import { NextProxy, NextRequest, NextResponse } from 'next/server'

import { chain, FunctionFactory } from '@/utils/chain'

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

const LOGGEDIN_ONLY_ROUTES = ['/user', '/profile', '/upload']
const withLoggedInOnly: FunctionFactory<NextProxy> = (nextProxy: NextProxy) => {
  const currentProxy: NextProxy = async (request: NextRequest, _event) => {
    const { pathname } = request.nextUrl
    const isLoggedIn = !!request.cookies.get('session')

    if (
      LOGGEDIN_ONLY_ROUTES.some(route => pathname.startsWith(route)) &&
      !isLoggedIn
    ) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)

      return NextResponse.redirect(loginUrl) // 如果沒有 session cookie，重定向到登入頁面
    }

    return nextProxy(request, _event)
  }

  return currentProxy
}

const LOGGEDOUT_ONLY_ROUTES = ['/login']
const withLoggedOutOnly: FunctionFactory<NextProxy> = (
  nextProxy: NextProxy
) => {
  const currentProxy: NextProxy = async (request: NextRequest, _event) => {
    const { pathname } = request.nextUrl
    const isLoggedIn = !!request.cookies.get('session')

    if (
      LOGGEDOUT_ONLY_ROUTES.some(route => pathname.startsWith(route)) &&
      isLoggedIn
    ) {
      const profile = new URL('/profile', request.url)

      return NextResponse.redirect(profile) // 如果已經登入，重定向到個人頁面
    }

    return nextProxy(request, _event)
  }

  return currentProxy
}

// 這裡的順序決定了執行的優先級
export default chain(
  [withDevOnly, withLoggedInOnly, withLoggedOutOnly],
  0,
  () => NextResponse.next()
)

export const config = {
  // 匹配所有路徑，由內部的邏輯自行判斷是否攔截
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
