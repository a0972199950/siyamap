import { Handler } from '@/lib/hono'
import {
  SeatMapDto,
  TCreateSeatMapDto,
  TFindSeatMapDto,
  TUpdateSeatMapDto,
} from '@/types/dto'
import _responseFormatter from '@/utils/response-formatter'

import _seatMapService from './seat-map.service'

class SeatMapController {
  constructor(
    private readonly responseFormatter = _responseFormatter,
    private readonly seatMapService = _seatMapService
  ) {}

  create: Handler = async c => {
    const venueId = await c.req.param().venueId
    const dto = (await c.req.json()) as TCreateSeatMapDto

    const seatMap = await this.seatMapService.create(venueId, dto)

    return this.responseFormatter.success(c, 200, {
      data: SeatMapDto.parse(seatMap),
    })
  }

  update: Handler = async c => {
    const { id } = (await c.req.param()) as TFindSeatMapDto

    const dto = (await c.req.json()) as TUpdateSeatMapDto

    const seatMap = await this.seatMapService.update(id, dto)

    if (!seatMap) {
      return this.responseFormatter.error(c, 404, {
        code: 'DATA_NOT_FOUND',
        message: '座位圖不存在',
      })
    }

    return this.responseFormatter.success(c, 200, {
      data: SeatMapDto.parse(seatMap),
    })
  }

  findOne: Handler = async c => {
    const { id } = (await c.req.param()) as TFindSeatMapDto

    const seatMap = await this.seatMapService.findOne(id)

    if (!seatMap) {
      return this.responseFormatter.error(c, 404, {
        code: 'DATA_NOT_FOUND',
        message: '座位圖不存在',
      })
    }

    return this.responseFormatter.success(c, 200, {
      data: SeatMapDto.parse(seatMap),
    })
  }
}

export default new SeatMapController()
