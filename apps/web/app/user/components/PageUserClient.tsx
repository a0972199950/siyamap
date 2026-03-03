'use client'

import { Button, Icon } from '@siyamap/ui'
import { faSpinner } from '@siyamap/ui'
import Link from 'next/link'
import React from 'react'

import dayjs from '@/lib/dayjs'
import { TUserDto } from '@/types/dto'

import useUser from '../hooks/use-user'

interface Props {
  initialUsers: TUserDto[]
}

const PageUserClient = (props: Props): React.ReactElement => {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [role, setRole] = React.useState<'ADMIN' | 'USER'>('USER')

  const { users, isLoading, createUserMutation } = useUser(props.initialUsers)

  React.useEffect(() => {
    if (createUserMutation.isSuccess) {
      // 成功創建後清空表單
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setRole('USER')
    }
  }, [createUserMutation.isSuccess])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserMutation.mutate({
      username,
      email,
      password,
      confirmPassword,
      role,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      {/* 回首頁按鈕 */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium text-green-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
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
          <h1 className="mb-2 text-4xl font-bold text-gray-800">使用者管理</h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* 新增使用者表單 */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-800">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-4 w-4 text-green-600"
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
              新增使用者
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  使用者名稱
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="輸入使用者名稱"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-green-500"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  電子郵件
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="輸入電子郵件地址"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-green-500"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  密碼
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="輸入密碼"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-green-500"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  確認密碼
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="再次輸入密碼"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-green-500"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  使用者角色
                </label>
                <select
                  id="role"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black transition-all focus:border-transparent focus:ring-2 focus:ring-green-500"
                  value={role}
                  onChange={e => setRole(e.target.value as 'ADMIN' | 'USER')}
                >
                  <option value="USER">一般使用者</option>
                  <option value="ADMIN">管理員</option>
                </select>
              </div>

              <Button
                type="primary"
                className="w-full transform rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
              >
                新增使用者
              </Button>
            </form>
          </div>

          {/* 使用者列表 */}
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              使用者列表
              {users?.length && (
                <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800">
                  {users.length}
                </span>
              )}
            </h2>

            {isLoading && (
              <div className="py-8 text-center">
                <Icon
                  icon={faSpinner}
                  animation="spin"
                  className="mb-2 text-2xl text-blue-500"
                />
                <p className="text-gray-600">載入中...</p>
              </div>
            )}

            <div className="max-h-96 space-y-4 overflow-y-auto">
              {users?.length
                ? users.map(user => (
                    <div
                      key={user.id}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 font-semibold text-white">
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800">
                              {user.username}
                            </h3>
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                user.role === 'ADMIN'
                                  ? 'border border-red-200 bg-red-100 text-red-800'
                                  : 'border border-green-200 bg-green-100 text-green-800'
                              }`}
                            >
                              {user.role === 'ADMIN' ? '管理員' : '一般使用者'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            建立於:{' '}
                            {dayjs(user.createdAt).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : !isLoading && (
                    <div className="py-8 text-center text-gray-500">
                      <svg
                        className="mx-auto mb-4 h-12 w-12 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p>尚無使用者資料</p>
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageUserClient
