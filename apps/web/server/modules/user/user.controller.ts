import { Handler } from '@/lib/hono'
import { TInsertUserDto } from '@/types/dto'
import { UserDto } from '@/types/dto'
import ResponseFormatter from '@/utils/response-formatter'

import userService from './user.service'

class UserController extends ResponseFormatter {
  public insert: Handler = async c => {
    const data = (await c.req.json()) as TInsertUserDto

    let newUser = null

    try {
      newUser = await userService.insert(data)
    } catch (err) {
      return this.formatErrorResponse(c, 400, {
        code: 'USER_EXISTS',
        message: '使用者已存在',
        details: err instanceof Error ? err.message : 'Unknown error',
      })
    }

    return this.formatSuccessResponse(c, 201, { data: UserDto.parse(newUser) })
  }

  public findAll: Handler = async c => {
    const users = await userService.findAll()
    return this.formatSuccessResponse(c, 200, {
      data: UserDto.array().parse(users),
    })
  }
}

export default new UserController()
