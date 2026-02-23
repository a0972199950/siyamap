import { ZodError } from 'zod'
import { Handler } from 'hono'
import { InsertUserDto } from '@/types/dto'
import userService from './user.service'
import ResponseFormatter from '@/utils/response-formatter'

class UserController extends ResponseFormatter {
  public insert: Handler = async c => {
    try {
      const data = await c.req.json()
      const validatedData = InsertUserDto.parse(data)

      const newUser = await userService.insert(validatedData)

      return this.formatSuccessResponse(c, 201, { data: newUser })
    } catch (err: any) {
      console.error('UserController insert error', err)

      if (err instanceof ZodError) {
        return this.formatErrorResponse(c, 400, {
          code: 'API_REQUEST_VALIDATION_ERROR',
          message: err.message,
        })
      }

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
