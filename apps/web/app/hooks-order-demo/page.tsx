'use client'

import { useState, useCallback } from 'react'

// ============================================================
// 🐛 Bug Demo: React Hooks 順序造成的靜默錯誤
// ============================================================
// 這個元件違反了 React 的 Rules of Hooks：
// 「不可以在條件式中呼叫 Hook」
// 當 showDiscount 切換時，Hook 呼叫順序改變，
// React 拿到錯誤的 state slot，但因為型別都是 number，
// TypeScript 和 React 都不會報錯 → 靜默 Bug
// ============================================================

function BuggyPriceDisplay({ showDiscount }: { showDiscount: boolean }) {
  const [price] = useState(100)

  if (showDiscount) {
    // showDiscount=true 時的呼叫順序: price(slot0) → discount(slot1) → tax(slot2)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [discount] = useState(10)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tax] = useState(5)

    return (
      <div className="rounded-lg border-2 border-green-400 bg-green-50 p-6">
        <h3 className="mb-3 text-lg font-bold text-green-700">
          showDiscount = true
        </h3>
        <div className="space-y-1 font-mono text-sm">
          <p>
            price (slot 0) = <span className="font-bold">{price}</span>
          </p>
          <p>
            discount (slot 1) = <span className="font-bold">{discount}</span>
          </p>
          <p>
            tax (slot 2) = <span className="font-bold">{tax}</span>
          </p>
        </div>
        <div className="mt-4 rounded bg-green-100 p-3 text-center text-xl font-bold">
          結果: {price} - {discount} + {tax} ={' '}
          <span className="text-green-700">{price - discount + tax}</span>
        </div>
      </div>
    )
  }

  // showDiscount=false 時的呼叫順序: price(slot0) → tax(slot1) → discount(slot2)
  // 但 slot1 記的是上次 discount 的值 10，slot2 記的是上次 tax 的值 5
  // → tax 拿到 10，discount 拿到 5，值完全對調！
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tax] = useState(5)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [discount] = useState(10)

  return (
    <div className="rounded-lg border-2 border-red-400 bg-red-50 p-6">
      <h3 className="mb-3 text-lg font-bold text-red-700">
        showDiscount = false
      </h3>
      <div className="space-y-1 font-mono text-sm">
        <p>
          price (slot 0) = <span className="font-bold">{price}</span>
        </p>
        <p>
          tax (slot 1) = <span className="font-bold">{tax}</span>{' '}
          <span className="text-red-500">
            ← 預期 5，但拿到 slot1 的值(原本是 discount)
          </span>
        </p>
        <p>
          discount (slot 2) = <span className="font-bold">{discount}</span>{' '}
          <span className="text-red-500">
            ← 預期 10，但拿到 slot2 的值(原本是 tax)
          </span>
        </p>
      </div>
      <div className="mt-4 rounded bg-red-100 p-3 text-center text-xl font-bold">
        結果: {price} - {discount} + {tax} ={' '}
        <span className="text-red-700">{price - discount + tax}</span>
      </div>
    </div>
  )
}

// ============================================================
// ✅ 正確寫法：永遠在頂層呼叫所有 Hook
// ============================================================

function CorrectPriceDisplay({
  showDiscount,
}: {
  showDiscount: boolean
}) {
  const [price] = useState(100)
  const [discount] = useState(10)
  const [tax] = useState(5)

  const result = showDiscount ? price - discount + tax : price + tax

  return (
    <div className="rounded-lg border-2 border-blue-400 bg-blue-50 p-6">
      <h3 className="mb-3 text-lg font-bold text-blue-700">
        ✅ 正確寫法 (showDiscount = {showDiscount ? 'true' : 'false'})
      </h3>
      <div className="space-y-1 font-mono text-sm">
        <p>
          price = <span className="font-bold">{price}</span>
        </p>
        <p>
          discount = <span className="font-bold">{discount}</span>
          {!showDiscount && ' (不使用)'}
        </p>
        <p>
          tax = <span className="font-bold">{tax}</span>
        </p>
      </div>
      <div className="mt-4 rounded bg-blue-100 p-3 text-center text-xl font-bold">
        結果:{' '}
        {showDiscount
          ? `${price} - ${discount} + ${tax}`
          : `${price} + ${tax}`}{' '}
        = <span className="text-blue-700">{result}</span>
      </div>
    </div>
  )
}

// ============================================================
// 頁面主體
// ============================================================

export default function HooksOrderDemoPage() {
  const [showDiscount, setShowDiscount] = useState(true)
  const [hasToggled, setHasToggled] = useState(false)

  const toggle = useCallback(() => {
    setShowDiscount((prev) => !prev)
    setHasToggled(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">
          🐛 React Hooks 順序 — 靜默錯誤 Demo
        </h1>
        <p className="mb-8 text-gray-600">
          這個頁面展示了在條件式中呼叫{' '}
          <code className="rounded bg-gray-200 px-1">useState</code>{' '}
          會導致 state slot 錯位，產生無任何錯誤訊息的 Bug。
        </p>

        {/* 操作區 */}
        <div className="mb-8 flex items-center gap-4 rounded-lg bg-white p-4 shadow">
          <span className="font-mono text-sm">
            showDiscount ={' '}
            <span
              className={`font-bold ${showDiscount ? 'text-green-600' : 'text-red-600'}`}
            >
              {String(showDiscount)}
            </span>
          </span>
          <button
            onClick={toggle}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            切換 showDiscount
          </button>
          {!hasToggled && (
            <span className="animate-pulse text-sm text-orange-500">
              👈 點擊切換後觀察值的變化
            </span>
          )}
        </div>

        {/* 步驟說明 */}
        <div className="mb-8 rounded-lg bg-yellow-50 border border-yellow-300 p-5 text-sm">
          <h2 className="mb-2 font-bold text-yellow-800">📋 操作步驟</h2>
          <ol className="list-inside list-decimal space-y-1 text-yellow-900">
            <li>頁面初始載入時 showDiscount = true，觀察 Buggy 元件的值</li>
            <li>
              點擊「切換 showDiscount」按鈕改為 false
            </li>
            <li>
              觀察 <strong>Buggy 元件</strong>：tax 和 discount
              的值會對調（因為 Hook slot 錯位）
            </li>
            <li>
              再切回 true，值又會恢復正常 — 這就是為什麼這個 Bug
              極難被發現
            </li>
            <li>
              對比 <strong>正確寫法</strong>：值始終穩定不變
            </li>
          </ol>
        </div>

        {/* Buggy 版本 */}
        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-red-600">
            <span>🐛</span> Buggy 版本（條件式中呼叫 Hook）
          </h2>
          <BuggyPriceDisplay showDiscount={showDiscount} />
        </section>

        {/* 正確版本 */}
        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-blue-600">
            <span>✅</span> 正確版本（頂層呼叫所有 Hook）
          </h2>
          <CorrectPriceDisplay showDiscount={showDiscount} />
        </section>

        {/* 原理解說 */}
        <section className="rounded-lg bg-gray-800 p-6 text-gray-100">
          <h2 className="mb-4 text-xl font-bold">🔍 為什麼會發生？</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              React 用一個<strong>陣列（linked list）</strong>依
              <strong>呼叫順序</strong>來儲存每個 Hook 的 state。
              每次 re-render 時，React 按照同樣的順序
              一一對應回去拿 state。
            </p>
            <div className="rounded bg-gray-900 p-4 font-mono text-xs">
              <p className="text-green-400">
                {'// showDiscount = true 時的 Hook 陣列:'}
              </p>
              <p>
                slot 0: price = 100 &nbsp;&nbsp;
                <span className="text-gray-500">← useState(100)</span>
              </p>
              <p>
                slot 1: discount = 10 &nbsp;
                <span className="text-gray-500">← useState(10)</span>
              </p>
              <p>
                slot 2: tax = 5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-gray-500">← useState(5)</span>
              </p>
              <br />
              <p className="text-red-400">
                {'// showDiscount = false 時，if 分支被跳過:'}
              </p>
              <p>
                slot 0: price = 100 &nbsp;&nbsp;
                <span className="text-gray-500">← useState(100) ✅</span>
              </p>
              <p>
                slot 1: tax → 拿到 10{' '}
                <span className="text-red-400">
                  ← 這是 discount 的 slot！❌
                </span>
              </p>
              <p>
                slot 2: discount → 拿到 5{' '}
                <span className="text-red-400">
                  ← 這是 tax 的 slot！❌
                </span>
              </p>
            </div>
            <p>
              因為 <code className="text-yellow-300">discount</code> 和{' '}
              <code className="text-yellow-300">tax</code> 都是{' '}
              <code className="text-yellow-300">number</code>
              ，TypeScript 的型別檢查也無法偵測到這個錯誤。
              React 在 development mode 會警告 Hook 數量改變，
              但如果 Hook <strong>數量不變</strong>、只是
              <strong>順序交換</strong>，連警告都不會有。
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
