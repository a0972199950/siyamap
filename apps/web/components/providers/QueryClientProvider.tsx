'use client'

import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Provider = (props: Props): React.ReactNode => {
  const { children } = props

  // 確保每個工作階段只建立一次 QueryClient，避免重新渲染時快取流失
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 預設 1 分鐘資料才算過期
          },
        },
      })
  )

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}

export default Provider
