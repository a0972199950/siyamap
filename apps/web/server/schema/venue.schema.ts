import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { seats } from './seat.schema'
import { seatMaps } from './seat_map.schema'
import { users } from './user.schema'

export const venues = pgTable('venues', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),

  name: text('name').notNull().unique(),

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

export type Venue = typeof venues.$inferSelect

export const venuesRelations = relations(venues, ({ many, one }) => ({
  seatMaps: many(seatMaps),

  seats: many(seats),
}))
