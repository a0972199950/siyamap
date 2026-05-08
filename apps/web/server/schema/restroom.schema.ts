import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { venues } from './venue.schema'

export const restrooms = pgTable('restrooms', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),

  maleCount: integer('male_count'),

  femaleCount: integer('female_count'),

  disabilityCount: integer('disability_count'),

  comment: text('comment'),

  venueId: uuid('venue_id')
    .references(() => venues.id)
    .notNull(),

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

export type Restroom = typeof restrooms.$inferSelect

export const restroomsRelations = relations(restrooms, ({ one }) => ({
  venue: one(venues, {
    fields: [restrooms.venueId],
    references: [venues.id],
  }),
}))
