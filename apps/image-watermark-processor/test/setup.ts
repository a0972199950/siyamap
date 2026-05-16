import fs from 'fs'
import path from 'path'

// 讀取 apps/web/.env.local 的環境變數供本地測試使用
const envPath = path.join(__dirname, '../.env.local')

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^"|"$/g, '')
    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}
