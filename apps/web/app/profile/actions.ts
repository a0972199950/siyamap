'use server' // 這是 Server Action 的關鍵標記

import db from '@/db' // 你的 Drizzle 連線實體
import { users } from '@/server/schema' // 你的 Schema 定義
import { revalidatePath } from 'next/cache'

export async function createUser(formData: FormData) {
  // 1. 從表單中提取資料
  const email = formData.get('email') as string
  const username = formData.get('username') as string

  try {
    // 2. 使用 Drizzle 插入資料
    await db.insert(users).values({
      email: email,
      username: username,
      // metadata 可以傳入 JSON 物件，Drizzle 會幫你處理
      metadata: { source: 'nextjs-server-action', joinedVia: 'web' },
    })

    // 3. 告訴 Next.js 重新整理頁面快取，讓新資料立刻顯示
    revalidatePath('/')
  } catch (error) {
    console.error('建立使用者失敗:', error)
  }
}
