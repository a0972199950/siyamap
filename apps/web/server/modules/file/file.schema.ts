import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

const files = pgTable('files', {
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
})

export default files
export type File = typeof files.$inferSelect
