'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const [confetti, setConfetti] = useState<
    Array<{ id: number; x: number; delay: number }>
  >([])

  useEffect(() => {
    // Create confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setConfetti(particles)
  }, [])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 font-sans">
      {/* Confetti particles */}
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute h-2 w-2 animate-bounce rounded bg-gradient-to-r from-pink-400 to-yellow-400"
          style={{
            left: `${particle.x}%`,
            top: '-10px',
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 text-center">
        {/* Floating balloons */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div
            className="text-6xl"
            style={{ animationDelay: '0s', animationDuration: '2s' }}
          >
            🎈
          </div>
        </div>
        <div className="absolute top-32 right-10 animate-bounce">
          <div
            className="text-6xl"
            style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}
          >
            🎈
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce">
          <div
            className="text-6xl"
            style={{ animationDelay: '1s', animationDuration: '3s' }}
          >
            🎈
          </div>
        </div>
        {/* Main title with colorful animated text */}
        <div className="mb-8">
          <h1 className="mb-4 animate-pulse text-6xl font-bold md:text-8xl">
            <span
              className="inline-block animate-bounce text-pink-500"
              style={{ animationDelay: '0s' }}
            >
              呱
            </span>
            <span
              className="inline-block animate-bounce text-purple-500"
              style={{ animationDelay: '0.1s' }}
            >
              呱
            </span>
            <span
              className="inline-block animate-bounce text-[300px] text-blue-500"
              style={{ animationDelay: '0.2s' }}
            >
              4
            </span>
            <span
              className="inline-block animate-bounce text-green-500"
              style={{ animationDelay: '0.3s' }}
            >
              歲
            </span>
          </h1>
          <h2 className="animate-pulse bg-gradient-to-r from-red-500 via-blue-500 via-green-500 via-yellow-500 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            生日快樂！
          </h2>
        </div>

        <div className="mb-8 flex items-center justify-center gap-4">
          <img
            src="/public/purdin.jpg"
            alt="Guagua"
            style={{ width: '200px' }}
          />

          <img
            src="/public/guagua.jpg"
            alt="Guagua"
            style={{ width: '500px' }}
          />

          <img
            src="/public/duoduo.jpeg"
            alt="Guagua"
            style={{ width: '200px' }}
          />
        </div>

        {/* Celebratory emojis */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 text-4xl">
          <span className="animate-spin">🍮</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            🧃
          </span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>
            🍮
          </span>
          <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>
            🧃
          </span>
          <span className="animate-spin" style={{ animationDelay: '0.8s' }}>
            🍮
          </span>
        </div>

        {/* Fun birthday message */}
        <div className="mx-auto max-w-2xl">
          <p className="animate-fade-in mb-4 text-xl font-semibold text-purple-800 md:text-2xl">
            🍮 呱呱今天又變<span className="text-5xl">大</span>了！ 🥤
          </p>
          <p
            className="animate-fade-in text-lg text-pink-700 md:text-xl"
            style={{ animationDelay: '1s' }}
          >
            你是全世界最可愛的青蛙! 祝你每天都有布丁和多多！ 🎉
          </p>
        </div>

        {/* Animated puddings */}
        <div className="absolute top-10 left-1/4 animate-ping">
          <span className="text-3xl text-yellow-400">🍮</span>
        </div>
        <div
          className="absolute top-20 right-1/4 animate-ping"
          style={{ animationDelay: '1s' }}
        >
          <span className="text-3xl text-yellow-400">🥤</span>
        </div>
        <div
          className="absolute bottom-20 left-1/3 animate-ping"
          style={{ animationDelay: '2s' }}
        >
          <span className="text-3xl text-yellow-400">🍮</span>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
