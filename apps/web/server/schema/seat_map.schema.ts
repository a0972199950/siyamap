import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { files } from './file.schema'
import { venues } from './venue.schema'

export const seatMaps = pgTable('seat_maps', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),

  venueId: uuid('venue_id')
    .references(() => venues.id)
    .notNull(),

  fileId: uuid('file_id')
    .references(() => files.id)
    .notNull(),

  name: text('name'),

  concertName: text('concert_name').notNull(),

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

export type SeatMap = typeof seatMaps.$inferSelect

export const seatMapsRelations = relations(seatMaps, ({ one }) => ({
  venue: one(venues, {
    fields: [seatMaps.venueId],
    references: [venues.id],
  }),

  file: one(files, {
    fields: [seatMaps.fileId],
    references: [files.id],
  }),
}))
