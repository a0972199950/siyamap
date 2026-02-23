// AI 寫得真好，努力學習

/**
 * 中間件工廠函數類型定義
 * 這是一個泛型類型，用於定義如何創建中間件的工廠函數
 *
 * @template T 中間件函數的類型
 * @param nextFunction 下一個要執行的中間件函數
 * @returns 當前中間件函數
 *
 * 使用模式：
 * - 每個工廠函數接收下一個中間件作為參數
 * - 返回自己的中間件實現
 * - 自己的中間件在執行完邏輯後，呼叫 nextFunction 繼續執行鏈
 */
export type FunctionFactory<T> = (
  /** 下一個 middleware */ nextFunction: T
) => /** 當前 middleware */ T

/**
 * 中間件鏈式執行器
 * 將多個中間件工廠函數組合成一個執行鏈，從右到左（由後往前）構建
 *
 * @template T 中間件函數的類型
 * @param factories 中間件工廠函數陣列，按執行順序排列
 * @param index 當前處理的工廠函數索引（內部遞歸使用）
 * @param end 鏈的終點函數，當所有中間件都執行完後呼叫
 * @returns 組合後的中間件函數
 *
 * 執行原理：
 * 1. 從最後一個工廠函數開始向前遞歸
 * 2. 每個工廠函數都會接收到「剩餘鏈」作為 nextFunction
 * 3. 最終形成一個完整的執行鏈
 *
 * 範例：
 * ```typescript
 * const middleware1: FunctionFactory<Handler> = (next) => (req, res) => {
 *   console.log('Before middleware1')
 *   next(req, res)
 *   console.log('After middleware1')
 * }
 *
 * const composedHandler = chain([middleware1, middleware2], 0, finalHandler)
 * ```
 */
export const chain = <T>(
  factories: FunctionFactory<T>[],
  index = 0,
  end: T
): T => {
  // 取得當前索引對應的工廠函數
  const currentFactory = factories[index]

  // 如果當前工廠函數存在
  if (!!currentFactory) {
    // 遞歸建構剩餘的中間件鏈
    const nextFactory = chain(factories, index + 1, end)
    // 使用當前工廠函數包裝剩餘鏈，形成新的中間件
    return currentFactory(nextFactory)
  }

  // 如果沒有更多工廠函數，返回終點函數
  return end
}
