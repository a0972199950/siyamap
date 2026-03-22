'use client'

import { Button } from '@siyamap/ui'
import DOMPurify from 'dompurify'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { v7 as uuid } from 'uuid'

const PageSeatMap: NextPage = () => {
  const handleHover = (e: any) => {
    const tagName = e.target.tagName.toLowerCase()

    if (['rect', 'polygon', 'path'].includes(tagName)) {
      e.target.style.strokeWidth = '4px'
      e.target.style.stroke = 'red'
      // e.target.style.filter = 'drop-shadow(3px 5px 2px rgb(0 0 0)'
      e.target.style.cursor = 'pointer'
    }
  }

  const handleUnHover = (e: any) => {
    const tagName = e.target.tagName.toLowerCase()

    if (['rect', 'polygon', 'path'].includes(tagName)) {
      e.target.removeAttribute('style')
    }
  }

  const [ids, setIds] = React.useState(new Set<string>())

  const handleClick = (e: any) => {
    const tagName = e.target.tagName.toLowerCase()

    if (['rect', 'polygon', 'path'].includes(tagName)) {
      const id = e.target.dataset.id || uuid()
      e.target.dataset.id = id
      console.log(id)

      setIds(prev => new Set(prev).add(id))
    }
  }

  const ref = React.useRef<HTMLDivElement>(null)

  const [result, setResult] = React.useState('')

  const handleExport = () => {
    if (!ref.current) return
    const svg = ref.current.querySelector('svg')
    if (!svg) return

    const cleanedSvgString = DOMPurify.sanitize(svg.outerHTML, {
      USE_PROFILES: { svg: true, svgFilters: true },
    })

    console.log(cleanedSvgString)
    setResult(cleanedSvgString)
  }

  const [svgString, setSvgString] = React.useState('')

  // 只在 svgString 變化時才更新 DOM
  React.useEffect(() => {
    if (!ref.current || !svgString) return
    ref.current.innerHTML = svgString
  }, [svgString])

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.svg'

    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        const cleanedSvgString = DOMPurify.sanitize(reader.result as string, {
          USE_PROFILES: { svg: true, svgFilters: true },
        })

        setSvgString(cleanedSvgString)
      }
      reader.readAsText(file)
    }

    input.click()
  }

  return (
    <div className="container mx-auto min-h-screen p-6">
      {/* 回首頁按鈕 */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium text-indigo-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>回首頁</span>
        </Link>
      </div>

      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        座位圖功能開發中...
      </h1>
      <p className="text-center text-gray-600">
        我們正在努力開發座位圖功能，敬請期待！
      </p>

      <div className="mb-4 flex justify-center gap-4">
        <Button onClick={handleImport}>導入 SVG</Button>
        <Button onClick={handleExport}>導出 SVG</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          {svgString && (
            <div
              ref={ref}
              onMouseOver={handleHover}
              onMouseOut={handleUnHover}
              onClick={handleClick}
            ></div>
          )}
        </div>

        <div>
          {Array.from(ids).map(id => {
            return <div key={id}>set id: {id}</div>
          })}

          {result && (
            <div>
              <h2 className="text-xl font-bold">導出結果：</h2>
              <div className="rounded bg-gray-100 p-4 break-all whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageSeatMap
