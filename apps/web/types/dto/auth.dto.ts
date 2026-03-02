import { z } from 'zod'

export const SignupDto = z
  .object({
    email: z.email('信箱格式不正確'),
    username: z.string().optional(),
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

export type TSignupDto = z.infer<typeof SignupDto>

export const LoginDto = z.object({
  email: z.email('信箱格式不正確'),
  password: z.string().min(1, '密碼至少需要 1 位'),
})

export type TLoginDto = z.infer<typeof LoginDto>
