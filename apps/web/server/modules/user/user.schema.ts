import { jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  email: text('email').notNull().unique(),

  username: text('username'),

  picture: text('picture'),

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

// export const usersRelations = relations(users, ({ many }) => ({
//   posts: many(users), // 指向其他模組的 model
// }));

export type User = typeof users.$inferSelect
