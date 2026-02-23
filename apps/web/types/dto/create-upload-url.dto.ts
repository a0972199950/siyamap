import { z } from 'zod'

export const CreateUploadUrlDto = z.object({
  fileType: z.string(),
})

export type TCreateUploadUrlDto = z.infer<typeof CreateUploadUrlDto>
