'use client'

import { NextPage } from 'next'
import Link from 'next/link'

import { useProfileContext } from '@/contexts/profile-context'

const PageProfile: NextPage = () => {
  const { profile } = useProfileContext()

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        {/* 回首頁按鈕 */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium text-blue-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
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

        <main className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-800">
                個人檔案
              </h1>
              <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <img
                  src={profile?.picture || 'https://via.placeholder.com/150'}
                  loading="lazy"
                  alt={profile?.username || 'User Avatar'}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <div className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full border-4 border-white bg-green-500"></div>
              </div>

              <div className="space-y-3 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {profile?.username || '使用者名稱'}
                </h2>
                <p className="inline-block rounded-lg bg-gray-50 px-4 py-2 text-gray-600">
                  {profile?.email || 'email@example.com'}
                </p>
              </div>

              <div className="w-full max-w-md space-y-4 pt-4">
                <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                  <h3 className="mb-2 font-semibold">帳戶資訊</h3>
                  <div className="text-sm opacity-90">
                    <div className="mb-1 flex items-center justify-between">
                      <span>狀態：</span>
                      <span className="font-medium">活躍</span>
                    </div>
                    <div className="mb-1 flex items-center justify-between">
                      <span>身分：</span>
                      <span
                        className={`rounded px-2 py-1 text-xs font-semibold ${
                          profile?.role === 'ADMIN'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {profile?.role === 'ADMIN' ? '管理員' : '一般使用者'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>會員等級：</span>
                      <span className="font-medium">標準會員</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default PageProfile
