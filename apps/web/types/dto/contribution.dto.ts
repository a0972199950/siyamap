import { z } from 'zod'

export const Distance = z.enum(['FAR', 'MIDDLE', 'NEAR'])
export type TDistance = z.infer<typeof Distance>

export const AirconStrength = z.enum(['HOT', 'COMFORT', 'COLD'])
export type TAirconStrength = z.infer<typeof AirconStrength>

export const ContributionDto = z.object({
  id: z.uuidv7(),
  venueId: z.uuidv7(),
  userId: z.uuidv7(),
  seatId: z.uuidv7(),
  concertName: z.string().nullable().optional(),
  satisfaction: z.coerce.number().min(0).max(9.9).nullable().optional(),
  isRestrictedArea: z.boolean().nullable().optional(),
  canPickRibbon: z.boolean().nullable().optional(),
  isAisleSeat: z.boolean().nullable().optional(),
  exitDistance: Distance.nullable().optional(),
  /** 分鐘 */
  dismissalTime: z.number().int().nullable().optional(),
  airconStrength: AirconStrength.nullable().optional(),
  airconComment: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TContributionDto = z.infer<typeof ContributionDto>

export const InsertContributionDto = ContributionDto.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
})

export type TInsertContributionDto = z.infer<typeof InsertContributionDto>

export const FindContributionDto = ContributionDto.pick({
  id: true,
})

export type TFindContributionDto = z.infer<typeof FindContributionDto>

export const UpdateContributionDto = ContributionDto.omit({
  id: true,
  venueId: true,
  userId: true,
  seatId: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export type TUpdateContributionDto = z.infer<typeof UpdateContributionDto>

export const DeleteContributionDto = ContributionDto.pick({
  id: true,
})

export type TDeleteContributionDto = z.infer<typeof DeleteContributionDto>
