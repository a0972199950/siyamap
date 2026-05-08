import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { contributions } from './contribution.schema'
import { files } from './file.schema'

export const contributionImages = pgTable('contribution_images', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),

  contributionId: uuid('contribution_id')
    .references(() => contributions.id)
    .notNull(),

  deviceName: text('device_name'),

  fileIdWithWatermark: uuid('file_id_with_watermark')
    .references(() => files.id)
    .notNull(),

  fileIdWithoutWatermark: uuid('file_id_without_watermark').references(
    () => files.id
  ),

  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type ContributionImage = typeof contributionImages.$inferSelect

export const contributionImagesRelations = relations(
  contributionImages,
  ({ one }) => ({
    contribution: one(contributions, {
      fields: [contributionImages.contributionId],
      references: [contributions.id],
    }),

    fileWithWatermark: one(files, {
      fields: [contributionImages.fileIdWithWatermark],
      references: [files.id],
      relationName: 'contribution_image_with_watermark',
    }),

    fileWithoutWatermark: one(files, {
      fields: [contributionImages.fileIdWithoutWatermark],
      references: [files.id],
      relationName: 'contribution_image_without_watermark',
    }),
  })
)
