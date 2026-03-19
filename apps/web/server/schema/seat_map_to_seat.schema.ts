import { relations } from 'drizzle-orm'
import { pgTable, serial, uuid } from 'drizzle-orm/pg-core'

import { seats } from './seat.schema'
import { seatMaps } from './seat_map.schema'

export const seatMapsToSeats = pgTable('seat_maps_to_seats', {
  id: serial('id').primaryKey(),

  seatMapId: uuid('seat_map_id')
    .references(() => seatMaps.id)
    .notNull(),

  seatId: serial('seat_id')
    .references(() => seats.id)
    .notNull(),
})

export type SeatMapsToSeats = typeof seatMapsToSeats

export const seatMapsToSeatsRelations = relations(
  seatMapsToSeats,
  ({ one }) => ({
    seatMap: one(seatMaps, {
      fields: [seatMapsToSeats.seatMapId],
      references: [seatMaps.id],
    }),

    seat: one(seats, {
      fields: [seatMapsToSeats.seatId],
      references: [seats.id],
    }),
  })
)
