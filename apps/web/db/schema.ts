import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  metadata: jsonb('metadata'),
})
