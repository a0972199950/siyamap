import { eq } from 'drizzle-orm'

import _db from '@/lib/db'
import { venues } from '@/server/schema'
import { TInsertVenueDto, TUpdateVenueDto } from '@/types/dto'

export class VenueService {
  constructor(private readonly db = _db) {}

  async insert(data: TInsertVenueDto) {
    const [newVenue] = await this.db.insert(venues).values(data).returning()

    return newVenue
  }

  async find(id: string) {
    const [venue] = await this.db
      .select()
      .from(venues)
      .where(eq(venues.id, id))
      .limit(1)

    return venue
  }

  async findAll() {
    const data = await this.db.select().from(venues)

    return data
  }

  async update(id: string, data: TUpdateVenueDto) {
    const [updatedVenue] = await this.db
      .update(venues)
      .set(data)
      .where(eq(venues.id, id))
      .returning()

    return updatedVenue
  }

  async delete(id: string) {
    const [deletedVenue] = await this.db
      .delete(venues)
      .where(eq(venues.id, id))
      .returning()

    return deletedVenue
  }
}

export default new VenueService()
