import { relations } from 'drizzle-orm'
import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { contributions } from './contribution.schema'
import { seatAreas } from './seat_area.schema'
import { venues } from './venue.schema'

export const SeatType = pgEnum('seat_type', [
  'STANDING',
  'SEATED',
  'ACCESSIBLE',
])

export const seats = pgTable(
  'seats',
  {
    id: uuid('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),

    venueId: uuid('venue_id')
      .references(() => venues.id)
      .notNull(),

    seatArea: uuid('seat_area')
      .references(() => seatAreas.id)
      .notNull(),

    seatRow: text('seat_row').notNull(),

    seatLabel: text('seat_label').notNull(),

    seatType: SeatType('seat_type'),

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
  table => [
    index('idx_seats_venue_id').on(table.venueId),
    index('idx_seats_area_row').on(table.seatArea, table.seatRow),
    index('idx_seats_area').on(table.seatArea),
  ]
)

export type Seat = typeof seats.$inferSelect

export const seatRelations = relations(seats, ({ one, many }) => ({
  venue: one(venues, {
    fields: [seats.venueId],
    references: [venues.id],
  }),

  area: one(seatAreas, {
    fields: [seats.seatArea],
    references: [seatAreas.id],
  }),

  contributions: many(contributions),
}))
