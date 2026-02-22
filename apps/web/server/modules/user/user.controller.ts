import { ZodError } from 'zod'
import { NextRequest } from 'next/server'
import { InsertUserDto } from '@/types/dto'
import userService from './user.service'
import BaseController from '@/utils/base-controller'

class UserController extends BaseController {
  async insert(req: NextRequest) {
    try {
      const data = await req.json()
      const validatedData = InsertUserDto.parse(data)

      const newUser = await userService.insert(validatedData)

      return this.formatSuccessResponse({ data: newUser }, 201)
    } catch (err: any) {
      console.error('UserController insert error', err)

      if (err instanceof ZodError) {
        return this.formatErrorResponse(
          'API_REQUEST_VALIDATION_ERROR',
          err.message,
          400
        )
      }

      return this.formatErrorResponse('INTERNAL_SERVER_ERROR', err.message, 500)
    }
  }

  async findAll(_req: NextRequest) {
    try {
      const users = await userService.findAll()
      return this.formatSuccessResponse({ data: users })
    } catch (err: any) {
      console.error('UserController findAll error', err)
      return this.formatErrorResponse('INTERNAL_SERVER_ERROR', err.message, 500)
    }
  }
}

export default new UserController()
