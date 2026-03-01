import { z } from 'zod'

export const GetLoginUrlDto = z.object({
  from: z.url('from URL 格式不正確'),
})

export type TGetLoginUrlDto = z.infer<typeof GetLoginUrlDto>

export const GetLoginUrlResDto = z.object({
  loginUrl: z.url('login URL 格式不正確'),
})

export type TGetLoginUrlResDto = z.infer<typeof GetLoginUrlResDto>
