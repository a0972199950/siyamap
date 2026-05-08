import { relations } from 'drizzle-orm'
import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { contributions } from './contribution.schema'
import { files } from './file.schema'

// 必須 export，pnpm db:push 才能知道有這個 enum
export const UserRole = pgEnum('user_role', ['ADMIN', 'USER'])

export const users = pgTable(
  'users',
  {
    id: uuid('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),

    email: text('email').notNull(),

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
  },
  table => [index('idx_users_email').on(table.email)]
)

export type User = typeof users.$inferSelect

export const usersRelations = relations(users, ({ many }) => ({
  files: many(files),
  contributions: many(contributions),
}))
