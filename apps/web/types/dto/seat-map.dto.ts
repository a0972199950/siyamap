import { z } from 'zod'

export const SeatMapDto = z.object({
  id: z.uuidv7(),

  venueId: z.uuidv7(),

  mapSvg: z.string(),

  createdAt: z.coerce.date(),

  updatedAt: z.coerce.date(),
})

export type TSeatMapDto = z.infer<typeof SeatMapDto>

export const CreateSeatMapDto = SeatMapDto.pick({
  mapSvg: true,
})

export type TCreateSeatMapDto = z.infer<typeof CreateSeatMapDto>

export const UpdateSeatMapDto = SeatMapDto.pick({
  mapSvg: true,
}).partial()

export type TUpdateSeatMapDto = z.infer<typeof UpdateSeatMapDto>

export const FindSeatMapDto = SeatMapDto.pick({
  id: true,
})

export type TFindSeatMapDto = z.infer<typeof FindSeatMapDto>

export const FindVenueForSeatMapDto = SeatMapDto.pick({
  venueId: true,
})

export type TFindVenueForSeatMapDto = z.infer<typeof FindVenueForSeatMapDto>
