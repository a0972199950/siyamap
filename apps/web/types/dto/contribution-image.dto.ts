import { z } from 'zod'

export const ContributionImageDto = z.object({
  id: z.uuidv7(),
  contributionId: z.uuidv7(),
  deviceName: z.string().nullable().optional(),
  fileIdWithWatermark: z.uuidv7(),
  fileIdWithoutWatermark: z.uuidv7().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TContributionImageDto = z.infer<typeof ContributionImageDto>

export const InsertContributionImageDto = ContributionImageDto.pick({
  contributionId: true,
  deviceName: true,
  fileIdWithWatermark: true,
  fileIdWithoutWatermark: true,
})

export type TInsertContributionImageDto = z.infer<
  typeof InsertContributionImageDto
>

export const FindContributionImageDto = ContributionImageDto.pick({
  id: true,
})

export type TFindContributionImageDto = z.infer<typeof FindContributionImageDto>

export const UpdateContributionImageDto = ContributionImageDto.pick({
  deviceName: true,
  fileIdWithWatermark: true,
  fileIdWithoutWatermark: true,
}).partial()

export type TUpdateContributionImageDto = z.infer<
  typeof UpdateContributionImageDto
>

export const DeleteContributionImageDto = ContributionImageDto.pick({
  id: true,
})

export type TDeleteContributionImageDto = z.infer<
  typeof DeleteContributionImageDto
>
