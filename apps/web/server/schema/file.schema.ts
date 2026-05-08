import { relations } from 'drizzle-orm'
import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { contributionImages } from './contribution_image.schema'
import { users } from './user.schema'

export const files = pgTable(
  'files',
  {
    id: uuid('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),

    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),

    url: text('url').notNull(),

    fileName: text('file_name').notNull(),

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
  },
  table => [index('idx_files_user_id').on(table.userId)]
)

export type File = typeof files.$inferSelect

export const filesRelations = relations(files, ({ one, many }) => ({
  user: one(users, {
    fields: [files.userId],
    references: [users.id],
  }),

  contributionImagesWithWatermark: many(contributionImages, {
    relationName: 'contribution_image_with_watermark',
  }),

  contributionImagesWithoutWatermark: many(contributionImages, {
    relationName: 'contribution_image_without_watermark',
  }),
}))
