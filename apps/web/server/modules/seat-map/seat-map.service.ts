import { eq } from 'drizzle-orm'

import _db from '@/lib/db'
import { seatMaps } from '@/server/schema'
import { TCreateSeatMapDto, TUpdateSeatMapDto } from '@/types/dto'

export class SeatMapService {
  constructor(private readonly db = _db) {}

  async create(venueId: string, data: TCreateSeatMapDto) {
    const [newSeatMep] = await this.db
      .insert(seatMaps)
      .values({
        ...data,
        venueId,
      })
      .returning()

    return newSeatMep
  }

  async update(seatMapId: string, data: TUpdateSeatMapDto) {
    const [updatedSeatMap] = await this.db
      .update(seatMaps)
      .set(data)
      .where(eq(seatMaps.id, seatMapId))
      .returning()

    return updatedSeatMap
  }

  async findOne(seatMapId: string) {
    const [seatMap] = await this.db
      .select()
      .from(seatMaps)
      .where(eq(seatMaps.id, seatMapId))

    return seatMap
  }
}

export default new SeatMapService()
