import { relations } from 'drizzle-orm'
import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core'

import { venues } from './venue.schema'
import { viewImages } from './view_image.schema'

export const seats = pgTable('seats', {
  id: serial('id').primaryKey(),

  venueId: uuid('venue_id')
    .references(() => venues.id)
    .notNull(),

  seatLabel: text('seat_label').notNull(),
})

export type Seat = typeof seats.$inferSelect

export const seatRelations = relations(seats, ({ one, many }) => ({
  venue: one(venues, {
    fields: [seats.venueId],
    references: [venues.id],
  }),

  viewImages: many(viewImages),
}))
