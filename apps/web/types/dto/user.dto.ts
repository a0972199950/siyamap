import { z } from 'zod'

export const UserDto = z.object({
  id: z.number(),
  email: z.email('信箱格式不正確'),
  username: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  metadata: z.record(z.string(), z.any()).optional(),
})

export type TUserDto = z.infer<typeof UserDto>

export const InsertUserDto = UserDto.pick({
  email: true,
  username: true,
  metadata: true,
})
  .extend({
    password: z.string().min(1, '密碼至少需要 1 位'),
    confirmPassword: z.string(),
  })
  .refine(
    data => {
      return data.password === data.confirmPassword
    },
    {
      path: ['confirmPassword'],
      message: '密碼和確認密碼不一致',
    }
  )

export type TInsertUserDto = z.infer<typeof InsertUserDto>
