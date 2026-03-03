import { z } from 'zod'

// 定義使用者角色 enum
export const UserRole = z.enum(['ADMIN', 'USER'])
export type TUserRole = z.infer<typeof UserRole>

export const UserDto = z.object({
  id: z.number(),
  email: z.email('信箱格式不正確'),
  username: z.string().nullable().optional(),
  picture: z.string().nullable().optional(),
  role: UserRole.default('USER'),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  metadata: z.record(z.string(), z.any()).nullable().optional(),
})

export type TUserDto = z.infer<typeof UserDto>

export const InsertUserDto = UserDto.pick({
  email: true,
  username: true,
  picture: true,
  role: true,
  metadata: true,
}).extend({
  password: z.string().min(1, '密碼至少需要 1 位'),
})

export type TInsertUserDto = z.infer<typeof InsertUserDto>
