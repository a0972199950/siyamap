import { Handler } from 'hono'
import { TInsertUserDto } from '@/types/dto'
import userService from './user.service'
import ResponseFormatter from '@/utils/response-formatter'

class UserController extends ResponseFormatter {
  public insert: Handler = async c => {
    try {
      const data = (await c.req.json()) as TInsertUserDto

      const newUser = await userService.insert(data)
      return this.formatSuccessResponse(c, 201, { data: newUser })
    } catch (err: any) {
      console.error('UserController insert error', err)

      return this.formatErrorResponse(c, 500, {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message,
      })
    }
  }

  public findAll: Handler = async c => {
    try {
      const users = await userService.findAll()
      return this.formatSuccessResponse(c, 200, { data: users })
    } catch (err: any) {
      console.error('UserController findAll error', err)

      return this.formatErrorResponse(c, 500, {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message,
      })
    }
  }
}

export default new UserController()
