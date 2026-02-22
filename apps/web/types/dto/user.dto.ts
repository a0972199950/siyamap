import { z } from 'zod'
import dayjs from 'dayjs'

export const UserDto = z.object({
  id: z.number(),
  email: z.email(),
  username: z.string().nullable(),
  createdAt: z.coerce.date().transform(val => dayjs(val)),
  updatedAt: z.coerce.date().transform(val => dayjs(val)),
  metadata: z.record(z.string(), z.any()).nullable(),
})

export type TUserDto = z.infer<typeof UserDto>
