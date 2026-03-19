import { relations } from 'drizzle-orm'
import {
  boolean,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { files } from './file.schema'
import { seats } from './seat.schema'
import { users } from './user.schema'

export const viewImages = pgTable('view_images', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),

  seatId: serial('seat_id')
    .references(() => seats.id)
    .notNull(),

  fileId: uuid('file_id')
    .references(() => files.id)
    .notNull(),

  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),

  isVerified: boolean('is_verified').notNull().default(false),

  comment: text('comment'),

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

  exif: jsonb('exif'),
})

export type ViewImage = typeof viewImages.$inferSelect

export const viewImageRelations = relations(viewImages, ({ one }) => ({
  seat: one(seats, {
    fields: [viewImages.seatId],
    references: [seats.id],
  }),

  file: one(files, {
    fields: [viewImages.fileId],
    references: [files.id],
  }),

  user: one(users, {
    fields: [viewImages.userId],
    references: [users.id],
  }),
}))
