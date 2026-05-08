import { relations } from 'drizzle-orm'
import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { seats } from './seat.schema'
import { seatMaps } from './seat_map.schema'

export const seatAreas = pgTable(
  'seat_areas',
  {
    id: uuid('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),

    seatMapId: uuid('seat_map_id')
      .references(() => seatMaps.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),

    areaLabel: text('area_label').notNull(),

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
  table => [index('idx_seat_areas_map').on(table.seatMapId)]
)

export type SeatArea = typeof seatAreas.$inferSelect

export const seatAreasRelations = relations(seatAreas, ({ one, many }) => ({
  seatMap: one(seatMaps, {
    fields: [seatAreas.seatMapId],
    references: [seatMaps.id],
  }),

  seats: many(seats),
}))
