import { z } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import UserSchema from '../user.schema'

// 定義具體的 CreateUser 驗證規則
export const CreateUserSchema = createInsertSchema(UserSchema)
  // 獲取需要前端傳送的欄位
  .pick({
    email: true,
    username: true,
  })
  // 定義驗證規則，可以增加資料庫裡沒有，但註冊流程需要的欄位
  .extend({
    email: z.email('信箱格式不正確'),
    username: z.string().optional(),
    password: z.string().min(1, '密碼至少需要 1 位'),
    confirmPassword: z.string(),
  })
  // 使用 .refine 進行跨欄位驗證（例如檢查密碼是否一致）
  .refine(
    data => {
      return data.password === data.confirmPassword
    },
    {
      path: ['confirmPassword'],
      message: '密碼和確認密碼不一致',
    }
  )

export type CreateUserDto = z.infer<typeof CreateUserSchema>
