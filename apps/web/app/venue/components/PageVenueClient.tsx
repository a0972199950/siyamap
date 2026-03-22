'use client'

import Link from 'next/link'
import React from 'react'

import dayjs from '@/lib/dayjs'
import { TVenueDto } from '@/types/dto'

import useVenue from '../hooks/use-venue'

interface Props {
  initialVenues: TVenueDto[]
}

const PageVenueClient = (props: Props): React.ReactElement => {
  const [name, setName] = React.useState('')
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editingName, setEditingName] = React.useState('')

  const {
    venues,
    isLoading,
    createVenueMutation,
    updateVenueMutation,
    deleteVenueMutation,
  } = useVenue(props.initialVenues)

  React.useEffect(() => {
    if (createVenueMutation.isSuccess) {
      setName('')
    }
  }, [createVenueMutation.isSuccess])

  React.useEffect(() => {
    if (updateVenueMutation.isSuccess) {
      setEditingId(null)
      setEditingName('')
    }
  }, [updateVenueMutation.isSuccess])

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createVenueMutation.mutate({ name })
  }

  const handleUpdate = (id: string) => {
    updateVenueMutation.mutate({ id, dto: { name: editingName } })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('確定要刪除此場館嗎？')) {
      deleteVenueMutation.mutate(id)
    }
  }

  const startEditing = (venue: TVenueDto) => {
    setEditingId(venue.id)
    setEditingName(venue.name)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingName('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      {/* 回首頁按鈕 */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium text-orange-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
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

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">場館管理</h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-600"></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* 新增場館表單 */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-800">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                <svg
                  className="h-4 w-4 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              新增場館
            </h2>

            <form className="space-y-6" onSubmit={handleCreate}>
              <div>
                <label
                  htmlFor="venue-name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  場館名稱
                </label>
                <input
                  id="venue-name"
                  type="text"
                  placeholder="輸入場館名稱"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={createVenueMutation.isPending || !name.trim()}
                className="w-full transform rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:from-orange-600 hover:to-amber-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {createVenueMutation.isPending ? '新增中...' : '新增場館'}
              </button>
            </form>

            {createVenueMutation.isError && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                新增失敗，請再試一次
              </div>
            )}
          </div>

          {/* 場館列表 */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-800">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              場館列表
              <span className="ml-auto rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                {venues.length} 個場館
              </span>
            </h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
              </div>
            ) : venues.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mb-3 text-4xl">🏟️</div>
                <p className="text-gray-500">目前沒有場館</p>
                <p className="text-sm text-gray-400">新增第一個場館吧！</p>
              </div>
            ) : (
              <div className="space-y-3">
                {venues.map(venue => (
                  <div
                    key={venue.id}
                    className="rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-orange-200 hover:shadow-md"
                  >
                    {editingId === venue.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingName}
                          onChange={e => setEditingName(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(venue.id)}
                            disabled={
                              updateVenueMutation.isPending ||
                              !editingName.trim()
                            }
                            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
                          >
                            {updateVenueMutation.isPending
                              ? '儲存中...'
                              : '儲存'}
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                          >
                            取消
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {venue.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            建立於{' '}
                            {dayjs(venue.createdAt).format(
                              'YYYY/MM/DD HH:mm:ss'
                            )}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(venue)}
                            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                          >
                            編輯
                          </button>
                          <button
                            onClick={() => handleDelete(venue.id)}
                            disabled={deleteVenueMutation.isPending}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                          >
                            刪除
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageVenueClient
