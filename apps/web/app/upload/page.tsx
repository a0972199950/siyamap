'use client'

import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

import api from '@/lib/api-client'
import logger from '@/utils/logger'

const PageUpload: NextPage = () => {
  const [error, setError] = React.useState<Error | null>(null)

  if (error) {
    throw error
  }

  const [file, setFile] = React.useState<File | null>(null)

  const handleUpload = async () => {
    try {
      const { data } = await api.createFile({
        fileType: file!.type,
      })

      logger.log('Upload URL:', data.uploadUrl)

      const res = await fetch(data.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file!.type,
        },
        body: file,
      })

      if (res.ok) {
        window.open(data.file.url, '_blank')
      } else {
        alert('檔案上傳失敗！')
      }
    } catch (err) {
      setError(err as Error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      {/* 回首頁按鈕 */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium text-purple-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
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

      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">檔案上傳</h1>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <p className="mt-4 text-gray-600">選擇您想要上傳的檔案</p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-purple-500">
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={e =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
              <label htmlFor="file" className="block cursor-pointer">
                <div className="space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    <svg
                      className="h-8 w-8 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      點擊選擇檔案
                    </p>
                    <p className="text-sm text-gray-500">或拖拽檔案到此處</p>
                  </div>
                </div>
              </label>
            </div>

            {file && (
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-700">
                  已選擇的檔案：
                </h3>
                <div className="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.type}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              disabled={!file}
              onClick={handleUpload}
              className={`w-full rounded-lg px-6 py-4 font-semibold text-white transition-all duration-200 ${
                file
                  ? 'transform cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:-translate-y-1 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl'
                  : 'cursor-not-allowed bg-gray-300'
              }`}
            >
              {file ? '開始上傳' : '請先選擇檔案'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageUpload
