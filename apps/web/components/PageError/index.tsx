import React from 'react'
import { getErrorConfig } from '@/utils/error-config'
import { ApiErrorResponse } from '@/types/index'
import { Button } from '@siyamap/ui'

export interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

const PageError = (props: Props) => {
  const { error, reset } = props

  const errorInfo = React.useMemo<ApiErrorResponse>(() => {
    try {
      return JSON.parse(error.message)
    } catch {
      return {
        code: 'UNKNOWN_ERROR',
      }
    }
  }, [error.message])

  const errorConfig = getErrorConfig(errorInfo)

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <h2 className="mb-2 text-2xl font-bold text-gray-800">
        {errorConfig.displayMessage}
      </h2>
      <p className="mx-auto mb-6 max-w-md text-gray-600">
        {errorConfig.message}
      </p>

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
          {JSON.stringify(
            {
              code: errorInfo.code,
              digest: error.digest,
              message: error.message,
              stack: error.stack,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}

export default PageError
