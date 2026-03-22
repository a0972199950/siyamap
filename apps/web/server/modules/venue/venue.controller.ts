import { Handler } from '@/lib/hono'
import {
  TFindVenueDto,
  TInsertVenueDto,
  TUpdateVenueDto,
  VenueDto,
} from '@/types/dto'
import _responseFormatter, {
  ResponseFormatter,
} from '@/utils/response-formatter'

import _venueService, { VenueService } from './venue.service'

class VenueController {
  constructor(
    private readonly responseFormatter: ResponseFormatter = _responseFormatter,
    private readonly venueService: VenueService = _venueService
  ) {}

  public insert: Handler = async c => {
    const data = (await c.req.json()) as TInsertVenueDto
    const user = c.get('user')

    const newVenue = await this.venueService.insert(user!.id, data)

    if (!newVenue) {
      return this.responseFormatter.error(c, 400, {
        code: 'VENUE_EXISTS',
        message: '場館已存在',
      })
    }

    return this.responseFormatter.success(c, 201, {
      data: VenueDto.parse(newVenue),
    })
  }

  public findOne: Handler = async c => {
    const { id } = c.req.param() as TFindVenueDto

    const venue = await this.venueService.find(id)

    if (!venue) {
      return this.responseFormatter.error(c, 404, {
        code: 'DATA_NOT_FOUND',
        message: '場館不存在',
      })
    }

    return this.responseFormatter.success(c, 200, {
      data: VenueDto.parse(venue),
    })
  }

  public findAll: Handler = async c => {
    const venues = await this.venueService.findAll()

    return this.responseFormatter.success(c, 200, {
      data: VenueDto.array().parse(venues),
    })
  }

  public update: Handler = async c => {
    const { id } = c.req.param() as TFindVenueDto
    const data = (await c.req.json()) as TUpdateVenueDto

    const newVenue = await this.venueService.update(id, data)

    if (!newVenue) {
      return this.responseFormatter.error(c, 404, {
        code: 'DATA_NOT_FOUND',
        message: '場館不存在',
      })
    }

    return this.responseFormatter.success(c, 200, {
      data: VenueDto.parse(newVenue),
    })
  }

  public delete: Handler = async c => {
    const { id } = c.req.param() as TFindVenueDto
    const deletedVenue = await this.venueService.delete(id)

    if (!deletedVenue) {
      return this.responseFormatter.error(c, 404, {
        code: 'DATA_NOT_FOUND',
        message: '場館不存在',
      })
    }

    return this.responseFormatter.success(c, 200, {
      data: '場館已刪除',
    })
  }
}

export default new VenueController()
