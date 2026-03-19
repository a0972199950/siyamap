import { relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from '@/server/schema'

export const files = pgTable('files', {
  id: serial('id').primaryKey(),

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

  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
})

export type File = typeof files.$inferSelect

export const filesRelations = relations(files, ({ one }) => ({
  user: one(users, {
    fields: [files.userId],
    references: [users.id],
  }),
}))
