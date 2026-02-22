import { middlewareChain } from '@/utils/middleware-chain'
import { withDevOnly } from '@/middlewares/with-dev-only'

// 這裡的順序決定了執行的優先級
export default middlewareChain([withDevOnly])

export const config = {
  // 匹配所有路徑，由內部的邏輯自行判斷是否攔截
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
