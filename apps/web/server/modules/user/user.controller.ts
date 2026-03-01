import { Handler } from '@/lib/hono'
import { TInsertUserDto } from '@/types/dto'
import ResponseFormatter from '@/utils/response-formatter'

import userService from './user.service'

class UserController extends ResponseFormatter {
  public insert: Handler = async c => {
    const data = (await c.req.json()) as TInsertUserDto

    const newUser = await userService.insert(data)
    return this.formatSuccessResponse(c, 201, { data: newUser })
  }

  public findAll: Handler = async c => {
    const users = await userService.findAll()
    return this.formatSuccessResponse(c, 200, { data: users })
  }
}

export default new UserController()
