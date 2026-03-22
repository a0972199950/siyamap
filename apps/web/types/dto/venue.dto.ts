import { z } from 'zod'

export const VenueDto = z.object({
  id: z.uuidv7('id 格式不正確'),
  name: z.string('必須提供場館名稱'),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TVenueDto = z.infer<typeof VenueDto>

export const InsertVenueDto = VenueDto.pick({
  name: true
})

export type TInsertVenueDto = z.infer<typeof InsertVenueDto>

export const FindVenueDto = VenueDto.pick({
  id: true,
})

export type TFindVenueDto = z.infer<typeof FindVenueDto>

export const UpdateVenueDto = VenueDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().optional(),
})

export type TUpdateVenueDto = z.infer<typeof UpdateVenueDto>

export const DeleteVenueDto = VenueDto.pick({
  id: true,
})

export type TDeleteVenueDto = z.infer<typeof DeleteVenueDto>
