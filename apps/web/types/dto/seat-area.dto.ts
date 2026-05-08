import { z } from 'zod'

export const SeatAreaDto = z.object({
  id: z.uuidv7(),
  seatMapId: z.uuidv7(),
  areaLabel: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TSeatAreaDto = z.infer<typeof SeatAreaDto>

export const InsertSeatAreaDto = SeatAreaDto.pick({
  seatMapId: true,
  areaLabel: true,
})

export type TInsertSeatAreaDto = z.infer<typeof InsertSeatAreaDto>

export const FindSeatAreaDto = SeatAreaDto.pick({
  id: true,
})

export type TFindSeatAreaDto = z.infer<typeof FindSeatAreaDto>

export const UpdateSeatAreaDto = SeatAreaDto.pick({
  areaLabel: true,
}).partial()

export type TUpdateSeatAreaDto = z.infer<typeof UpdateSeatAreaDto>

export const DeleteSeatAreaDto = SeatAreaDto.pick({
  id: true,
})

export type TDeleteSeatAreaDto = z.infer<typeof DeleteSeatAreaDto>
