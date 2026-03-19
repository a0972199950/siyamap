import { Button } from '@siyamap/ui'
import React from 'react'

import { ApiErrorResponse } from '@/types/index'
import { getErrorConfig } from '@/utils/error-config'

export interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

const PageError = (props: Props) => {
  const { error, reset } = props

  const errorCause = React.useMemo<ApiErrorResponse>(() => {
    // Next.js 序列化 error 時不保留 cause，所以從 message 解析
    try {
      const parsed = JSON.parse(error.message)
      if (parsed && typeof parsed === 'object' && 'code' in parsed) {
        return parsed as ApiErrorResponse
      }
    } catch {
      // message 不是 JSON，忽略
    }
    return {
      code: 'UNKNOWN_ERROR',
    }
  }, [error.message])

  const errorConfig = getErrorConfig(errorCause)

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <h2 className="mb-2 text-2xl font-bold text-gray-800">
        {errorConfig.displayMessage}
      </h2>

      {/* 3. 按鈕區域 */}
      <div className="flex gap-4">
        <Button type="secondary" onClick={() => (window.location.href = '/')}>
          回首頁
        </Button>

        <Button type="primary" onClick={reset}>
          再試一次
        </Button>
      </div>

      <div className="mt-10 w-full max-w-2xl overflow-auto rounded border border-red-100 bg-red-50 p-4 text-left">
        <p className="mb-2 font-mono text-xs font-bold text-red-800 uppercase">
          Debug Info:
        </p>
        <pre className="text-[10px] leading-tight text-red-700">
          {JSON.stringify(errorConfig, null, 2)}
          <br />
          {error.stack}
        </pre>
      </div>
    </div>
  )
}

export default PageError
