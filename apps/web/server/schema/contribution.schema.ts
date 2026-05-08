import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

import { contributionImages } from './contribution_image.schema'
import { seats } from './seat.schema'
import { users } from './user.schema'
import { venues } from './venue.schema'

export const Distance = pgEnum('distance', ['FAR', 'MIDDLE', 'NEAR'])

export const AirconStrength = pgEnum('aircon_strength', [
  'HOT',
  'COMFORT',
  'COLD',
])

export const contributions = pgTable(
  'contributions',
  {
    id: uuid('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),

    venueId: uuid('venue_id')
      .references(() => venues.id)
      .notNull(),

    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),

    seatId: uuid('seat_id')
      .references(() => seats.id)
      .notNull(),

    concertName: text('concert_name'),

    satisfaction: numeric('satisfaction', { precision: 2, scale: 1 }),

    isRestrictedArea: boolean('is_restricted_area'),

    canPickRibbon: boolean('can_pick_ribbon'),

    isAisleSeat: boolean('is_aisle_seat'),

    exitDistance: Distance('exit_distance'),

    /** 分鐘 */
    dismissalTime: integer('dismissal_time'),

    airconStrength: AirconStrength('aircon_strength'),

    airconComment: text('aircon_comment'),

    comment: text('comment'),

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
    index('idx_contributions_venue_id').on(table.venueId),
    index('idx_contributions_user_id').on(table.userId),
    index('idx_contributions_created_at').on(table.createdAt),
  ]
)

export type Contribution = typeof contributions.$inferSelect

export const contributionsRelations = relations(
  contributions,
  ({ one, many }) => ({
    venue: one(venues, {
      fields: [contributions.venueId],
      references: [venues.id],
    }),

    user: one(users, {
      fields: [contributions.userId],
      references: [users.id],
    }),

    seat: one(seats, {
      fields: [contributions.seatId],
      references: [seats.id],
    }),

    images: many(contributionImages),
  })
)
