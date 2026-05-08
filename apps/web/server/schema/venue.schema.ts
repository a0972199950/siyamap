import { relations } from 'drizzle-orm'
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { contributions } from './contribution.schema'
import { restrooms } from './restroom.schema'
import { seats } from './seat.schema'
import { seatMaps } from './seat_map.schema'

export const TaiwanArea = pgEnum('taiwan_area', [
  'NORTHERN',
  'CENTRAL',
  'SOUTHERN',
  'EASTERN',
  'ISLANDS',
])

export const VenueStatus = pgEnum('venue_status', ['DRAFT', 'PUBLISHED'])

export const venues = pgTable('venues', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),

  name: text('name').notNull(),

  status: VenueStatus('status').default('DRAFT'),

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

  area: TaiwanArea('area'),

  address: text('address'),

  restrictedView: text('restricted_view'),

  seatCount: integer('seat_count'),

  lockerCount: integer('locker_count'),

  trafficGuide: text('traffic_guide'),
})

export type Venue = typeof venues.$inferSelect

export const venuesRelations = relations(venues, ({ many, one }) => ({
  seatMap: one(seatMaps),
  restroom: one(restrooms),
  seats: many(seats),
  contributions: many(contributions),
}))
