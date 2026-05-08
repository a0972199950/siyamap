import { z } from 'zod'

export const TaiwanArea = z.enum([
  'NORTHERN',
  'CENTRAL',
  'SOUTHERN',
  'EASTERN',
  'ISLANDS',
])
export type TTaiwanArea = z.infer<typeof TaiwanArea>

export const VenueStatus = z.enum(['DRAFT', 'PUBLISHED'])
export type TVenueStatus = z.infer<typeof VenueStatus>

export const VenueDto = z.object({
  id: z.uuidv7('id 格式不正確'),
  name: z.string('必須提供場館名稱'),
  status: VenueStatus.nullable().optional(),
  area: TaiwanArea.nullable().optional(),
  address: z.string().nullable().optional(),
  restrictedView: z.string().nullable().optional(),
  seatCount: z.number().int().nullable().optional(),
  lockerCount: z.number().int().nullable().optional(),
  trafficGuide: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TVenueDto = z.infer<typeof VenueDto>

export const InsertVenueDto = VenueDto.pick({
  name: true,
  area: true,
  address: true,
  restrictedView: true,
  seatCount: true,
  lockerCount: true,
  trafficGuide: true,
})

export type TInsertVenueDto = z.infer<typeof InsertVenueDto>

export const FindVenueDto = VenueDto.pick({
  id: true,
})

export type TFindVenueDto = z.infer<typeof FindVenueDto>

export const UpdateVenueDto = VenueDto.omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export type TUpdateVenueDto = z.infer<typeof UpdateVenueDto>

export const DeleteVenueDto = VenueDto.pick({
  id: true,
})

export type TDeleteVenueDto = z.infer<typeof DeleteVenueDto>
