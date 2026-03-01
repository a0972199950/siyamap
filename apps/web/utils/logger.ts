type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'debug'

interface Logger {
  log: (...args: any[]) => void
  error: (...args: any[]) => void
  warn: (...args: any[]) => void
  info: (...args: any[]) => void
  debug: (...args: any[]) => void
}

// ANSI 顏色代碼
const colors = {
  reset: '\x1b[0m',
  white: '\x1b[37m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
} as const

// 中文前綴配置
const prefixConfig: Record<LogLevel, { prefix: string; color: string }> = {
  log: { prefix: '[日誌]', color: colors.white },
  error: { prefix: '[錯誤]', color: colors.red },
  warn: { prefix: '[警告]', color: colors.yellow },
  info: { prefix: '[資訊]', color: colors.blue },
  debug: { prefix: '[偵錯]', color: colors.cyan },
}

// 創建 logger 方法
const createLogMethod = (level: LogLevel) => {
  return (...args: any[]) => {
    const { prefix, color } = prefixConfig[level]
    const timestamp = new Date().toLocaleTimeString('zh-TW')

    // 如果在瀏覽器環境中
    if (typeof window !== 'undefined') {
      // 瀏覽器環境使用 CSS 樣式
      const cssColor =
        level === 'error'
          ? 'color: #ff4444; font-weight: bold;'
          : level === 'warn'
            ? 'color: #ffaa00; font-weight: bold;'
            : level === 'info'
              ? 'color: #4488ff; font-weight: bold;'
              : level === 'debug'
                ? 'color: #44aaaa; font-weight: bold;'
                : 'color: #ffffff;'

      console[level](`%c${prefix} ${timestamp}`, cssColor, ...args)
    } else {
      // Node.js 環境使用 ANSI 顏色
      console[level](`${color}${prefix} ${timestamp}${colors.reset}`, ...args)
    }
  }
}

// 創建 logger 物件
const logger: Logger = {
  log: createLogMethod('log'),
  error: createLogMethod('error'),
  warn: createLogMethod('warn'),
  info: createLogMethod('info'),
  debug: createLogMethod('debug'),
}

export default logger
