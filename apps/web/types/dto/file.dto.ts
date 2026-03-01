import { z } from 'zod'

export const FileDto = z.object({
  id: z.number(),
  url: z.url(),
  fileName: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TFileDto = z.infer<typeof FileDto>

export const CreateFileDto = z.object({
  fileType: z.string(),
})

export type TCreateFileDto = z.infer<typeof CreateFileDto>

export const CreateFileResDto = z.object({
  file: FileDto,
  uploadUrl: z.url(),
})

export type TCreateFileResDto = z.infer<typeof CreateFileResDto>
