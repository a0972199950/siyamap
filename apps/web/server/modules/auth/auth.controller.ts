import bcrypt from 'bcryptjs'
import { deleteCookie } from 'hono/cookie'

import { Handler } from '@/lib/hono'
import userService from '@/server/modules/user/user.service'
import { TLoginDto, TSignupDto } from '@/types/dto'
import ResponseFormatter from '@/utils/response-formatter'
import setSessionCookie from '@/utils/set-session-cookie'

class AuthController extends ResponseFormatter {
  public signup: Handler = async c => {
    const data = (await c.req.json()) as TSignupDto

    let user = null
    try {
      user = await userService.insert(data)
    } catch (error) {
      return this.formatErrorResponse(c, 500, {
        code: 'USER_EXISTS',
        message: '使用者已存在',
      })
    }

    await setSessionCookie(c, user.id)

    return this.formatSuccessResponse(c, 201, { data: user })
  }

  public login: Handler = async c => {
    const data = (await c.req.json()) as TLoginDto

    const { email, password } = data

    const user = await userService.findOne({ email })

    if (!user) {
      return this.formatErrorResponse(c, 404, {
        code: 'USER_NOT_FOUND',
        message: '使用者不存在',
      })
    }

    if (!user.password) {
      return this.formatErrorResponse(c, 401, {
        code: 'USER_FROM_OAUTH',
        message: '此帳號來自第三方登入',
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return this.formatErrorResponse(c, 401, {
        code: 'UNAUTHORIZED',
        message: '帳號或密碼錯誤',
      })
    }

    await setSessionCookie(c, user.id)

    return this.formatSuccessResponse(c, 200, { data: user })
  }

  public logout: Handler = async c => {
    deleteCookie(c, 'session')
    return this.formatSuccessResponse(c, 200, { data: true })
  }
}

export default new AuthController()
