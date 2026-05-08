import { z } from 'zod'

export const RestroomDto = z.object({
  id: z.uuidv7(),
  venueId: z.uuidv7(),
  maleCount: z.number().int().nullable().optional(),
  femaleCount: z.number().int().nullable().optional(),
  disabilityCount: z.number().int().nullable().optional(),
  comment: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TRestroomDto = z.infer<typeof RestroomDto>

export const InsertRestroomDto = RestroomDto.pick({
  venueId: true,
  maleCount: true,
  femaleCount: true,
  disabilityCount: true,
  comment: true,
})

export type TInsertRestroomDto = z.infer<typeof InsertRestroomDto>

export const FindRestroomDto = RestroomDto.pick({
  id: true,
})

export type TFindRestroomDto = z.infer<typeof FindRestroomDto>

export const UpdateRestroomDto = RestroomDto.omit({
  id: true,
  venueId: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export type TUpdateRestroomDto = z.infer<typeof UpdateRestroomDto>

export const DeleteRestroomDto = RestroomDto.pick({
  id: true,
})

export type TDeleteRestroomDto = z.infer<typeof DeleteRestroomDto>
