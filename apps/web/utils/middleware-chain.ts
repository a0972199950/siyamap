// AI 寫得真好，努力學習

import { NextProxy, NextResponse } from 'next/server'

// 接收一個 nextMiddleware，並回傳自己的 middleware
// 自己的 middleware 會在執行完自己的邏輯後，呼叫 nextMiddleware 來繼續執行下一個 middleware
export type MiddlewareFactory = (
  /** 下一個 middleware */ nextMiddleware: NextProxy
) => /** 當前 middleware */ NextProxy

// 接收一個 MiddlewareFactory 的陣列，並回傳當前 index 的 middleware
export const middlewareChain = (
  middlewareFactories: MiddlewareFactory[],
  index = 0
): NextProxy => {
  const currentMiddlewareFactory = middlewareFactories[index]

  if (!!currentMiddlewareFactory) {
    const nextMiddlewareFactory = middlewareChain(
      middlewareFactories,
      index + 1
    )
    return currentMiddlewareFactory(nextMiddlewareFactory)
  }

  return () => NextResponse.next()
}
