import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

// 只在本地開發時載入 .env.local
if (process.env.NODE_ENV !== 'production') {
  config({ path: '.env.local' })
}

export default defineConfig({
  schema: './server/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
