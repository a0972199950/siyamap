import { relations } from 'drizzle-orm'
import {
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

import { files } from '@/server/modules/file/file.schema'

// 必須 export，pnpm db:push 才能知道有這個 enum
export const UserRole = pgEnum('user_role', ['ADMIN', 'USER'])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  email: text('email').notNull().unique(),

  username: text('username'),

  password: text('password'),

  picture: text('picture'),

  role: UserRole('role').notNull().default('USER'),

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

  metadata: jsonb('metadata'),
})

export type User = typeof users.$inferSelect

export const usersRelations = relations(users, ({ many }) => ({
  files: many(files),
}))
