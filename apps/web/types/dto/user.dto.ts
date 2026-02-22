import { z } from 'zod'

export const UserDto = z.object({
  id: z.number(),
  email: z.email(),
  username: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  metadata: z.record(z.string(), z.any()).nullable(),
})

export type TUserDto = z.infer<typeof UserDto>
