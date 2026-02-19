'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { fetchHeavyData } from './actions'

function SlowComponent({ index }: { index: number }) {
  console.log(`Rendering item ${index}`)
  const startTime = performance.now()
  // 保持 0.05ms 的負擔，模擬真實複雜組件
  while (performance.now() - startTime < 0.05) {}

  return null
  // return (
  //   <div
  //     className="h-2 w-2 rounded-sm bg-emerald-500 transition-colors hover:bg-white"
  //     title={`Item ${index}`}
  //   />
  // )
}

export default function PerformanceTestPage() {
  const [isPending, startTransition] = useTransition()
  const [items, setItems] = useState<number[]>([])
  const [renderMode, setRenderMode] = useState<'Normal' | 'Transition'>(
    'Normal'
  )

  // 用於計算時間的 Ref
  const startTimeRef = useRef<number>(0)
  const [totalTime, setTotalTime] = useState<number | null>(null)

  // 監測渲染完成
  useEffect(() => {
    if (items.length > 0 && !isPending && startTimeRef.current !== 0) {
      const endTime = performance.now()
      setTotalTime(endTime - startTimeRef.current)
      startTimeRef.current = 0 // 重設
    }
  }, [items, isPending])

  const handleNormalUpdate = async () => {
    setRenderMode('Normal')
    setItems([])
    setTotalTime(null)
    const data = await fetchHeavyData()

    startTimeRef.current = performance.now()
    setItems(data)
  }

  const handleTransitionUpdate = async () => {
    setRenderMode('Transition')
    setItems([])
    setTotalTime(null)
    const data = await fetchHeavyData()

    startTimeRef.current = performance.now()
    startTransition(() => {
      setItems(data)
    })
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">React 併發模式實驗室</h1>

        <div className="mb-8 rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            測試非控制輸入框（打字測試）：
          </label>
          <input
            placeholder="渲染時在此打字..."
            className="w-full rounded border border-slate-600 bg-slate-950 p-3 text-lg outline-none focus:border-blue-500"
          />

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleNormalUpdate}
              className="flex-1 rounded bg-red-600 p-3 font-bold hover:bg-red-500"
            >
              實驗 A：直接更新
            </button>
            <button
              onClick={handleTransitionUpdate}
              className="flex-1 rounded bg-blue-600 p-3 font-bold hover:bg-blue-500"
            >
              實驗 B：Transition
            </button>
          </div>
        </div>

        {/* 數據面板 */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="text-sm text-slate-400">當前狀態</div>
            <div
              className={`font-mono text-xl ${isPending ? 'animate-pulse text-yellow-500' : 'text-green-400'}`}
            >
              {isPending ? '正在分片渲染...' : '已完成'}
            </div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
            <div className="text-sm text-slate-400">
              總渲染耗時 (Total Render Time)
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {totalTime ? `${totalTime.toFixed(2)} ms` : '--'}
            </div>
          </div>
        </div>

        <div className="flex min-h-[300px] flex-wrap gap-1 rounded-lg border border-slate-800 bg-slate-950 p-2">
          {items.map(i => (
            <SlowComponent key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
