'use client'

import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

import api from '@/lib/api-client'
import logger from '@/utils/logger'

const DEFAULT_FROM_URL = '/'

const PageLogin: NextPage = () => {
  const [loginUrl, setLoginUrl] = React.useState<string | null>(null)
  const search = typeof window !== 'undefined' ? window.location.search : ''
  const from = new URLSearchParams(search).get('from') || DEFAULT_FROM_URL

  React.useEffect(() => {
    const fetchLoginUrl = async () => {
      const { data } = await api.generateGoogleLoginUrl({ from })
      setLoginUrl(data.loginUrl)
    }

    fetchLoginUrl()
  }, [from])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-100 p-6">
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

      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586l6.879-6.879A6 6 0 0121 9z"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">歡迎回來</h1>
            <p className="text-gray-600">請登入您的帳戶以继续使用</p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          </div>

          <div className="space-y-6">
            <a
              href={loginUrl || '#'}
              className={`flex w-full items-center justify-center rounded-xl px-6 py-4 font-semibold transition-all duration-200 ${
                loginUrl
                  ? 'transform border-2 border-gray-300 bg-white text-gray-700 hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg'
                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
              }`}
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loginUrl ? '使用 Google 登入' : '準備登入連結中...'}
            </a>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">或</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                還沒有帳戶？
                <a
                  href="#"
                  className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                >
                  立即註冊
                </a>
              </p>
            </div>

            <div className="rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 h-5 w-5 text-blue-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-sm text-blue-700">
                  <p className="mb-1 font-medium">安全登入</p>
                  <p className="text-blue-600">
                    我們使用 Google OAuth 確保您的帳戶安全
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLogin
