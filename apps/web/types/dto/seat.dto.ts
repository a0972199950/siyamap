import { z } from 'zod'

export const SeatType = z.enum(['STANDING', 'SEATED', 'ACCESSIBLE'])
export type TSeatType = z.infer<typeof SeatType>

export const SeatDto = z.object({
  id: z.uuidv7(),
  venueId: z.uuidv7(),
  seatArea: z.uuidv7(),
  seatRow: z.string(),
  seatLabel: z.string(),
  seatType: SeatType.nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TSeatDto = z.infer<typeof SeatDto>

export const InsertSeatDto = SeatDto.pick({
  venueId: true,
  seatArea: true,
  seatRow: true,
  seatLabel: true,
  seatType: true,
})

export type TInsertSeatDto = z.infer<typeof InsertSeatDto>

export const FindSeatDto = SeatDto.pick({
  id: true,
})

export type TFindSeatDto = z.infer<typeof FindSeatDto>

export const UpdateSeatDto = SeatDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export type TUpdateSeatDto = z.infer<typeof UpdateSeatDto>

export const DeleteSeatDto = SeatDto.pick({
  id: true,
})

export type TDeleteSeatDto = z.infer<typeof DeleteSeatDto>
