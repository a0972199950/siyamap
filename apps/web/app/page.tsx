'use client'

import Image from 'next/image'
import Link from 'next/link'

import api from '@/lib/api-client'
import duoduo from '@/public/public/duoduo.jpeg'
import guagua from '@/public/public/guagua.jpg'
import purdin from '@/public/public/purdin.jpg'

export default function Home() {
  const handleLogout = async () => {
    await api.logout()
    alert('已成功登出！')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 font-sans">
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 text-center">
        <div className="mb-8 flex w-[70vw] items-center justify-center">
          <Image
            src={purdin}
            alt="Purdin"
            placeholder="blur"
            style={{ minWidth: 0, flexGrow: 1, flexBasis: '0' }}
          />

          <Image
            src={guagua}
            alt="Guagua"
            placeholder="blur"
            style={{ minWidth: 0, flexGrow: 1, flexBasis: '0' }}
          />

          <Image
            src={duoduo}
            alt="Duoduo"
            placeholder="blur"
            style={{ minWidth: 0, flexGrow: 1, flexBasis: '0' }}
          />
        </div>

        {/* Navigation Links */}
        <div className="mt-12 mb-8">
          <h3
            className="animate-fade-in mb-6 text-2xl font-bold text-purple-800"
            style={{ animationDelay: '2s' }}
          >
            🌟 探索更多功能 🌟
          </h3>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-5">
            <Link
              href="/profile"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative z-10 text-center">
                <div className="mb-2 text-3xl">👤</div>
                <div className="font-semibold">個人檔案</div>
                <div className="text-xs opacity-80">查看資料</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>

            <Link
              href="/upload"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative z-10 text-center">
                <div className="mb-2 text-3xl">📁</div>
                <div className="font-semibold">檔案上傳</div>
                <div className="text-xs opacity-80">上傳檔案</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>

            <Link
              href="/user"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative z-10 text-center">
                <div className="mb-2 text-3xl">👥</div>
                <div className="font-semibold">使用者管理</div>
                <div className="text-xs opacity-80">管理帳戶</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>

            <Link
              href="/login"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-400 to-cyan-500 p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative z-10 text-center">
                <div className="mb-2 text-3xl">🔐</div>
                <div className="font-semibold">登入</div>
                <div className="text-xs opacity-80">帳戶登入</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>

            <button
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-400 to-cyan-500 p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => handleLogout()}
            >
              <div className="relative z-10 text-center">
                <div className="mb-2 text-3xl">🔐</div>
                <div className="font-semibold">登出</div>
                <div className="text-xs opacity-80">帳戶登出</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
