import _bcrypt from 'bcryptjs'
import { deleteCookie } from 'hono/cookie'

import { Handler } from '@/lib/hono'
import _userService, { UserService } from '@/server/modules/user/user.service'
import { TLoginDto, TSignupDto } from '@/types/dto'
import _responseFormatter, {
  ResponseFormatter,
} from '@/utils/response-formatter'
import _setSessionCookie from '@/utils/set-session-cookie'

class AuthController {
  constructor(
    private readonly responseFormatter: ResponseFormatter = _responseFormatter,
    private readonly userService: UserService = _userService,
    private readonly setSessionCookie = _setSessionCookie,
    private readonly compare = _bcrypt.compare
  ) {}

  public signup: Handler = async c => {
    const data = (await c.req.json()) as TSignupDto

    let user = null
    try {
      user = await this.userService.insert(data)
    } catch (error) {
      return this.responseFormatter.error(c, 500, {
        code: 'USER_EXISTS',
        message: '使用者已存在',
      })
    }

    await this.setSessionCookie(c, user.id)

    return this.responseFormatter.success(c, 201, { data: user })
  }

  public login: Handler = async c => {
    const data = (await c.req.json()) as TLoginDto

    const { email, password } = data

    const user = await this.userService.findOne({ email })

    if (!user) {
      return this.responseFormatter.error(c, 404, {
        code: 'USER_NOT_FOUND',
        message: '使用者不存在',
      })
    }

    if (!user.password) {
      return this.responseFormatter.error(c, 401, {
        code: 'USER_FROM_OAUTH',
        message: '此帳號來自第三方登入',
      })
    }

    const isPasswordValid = await this.compare(password, user.password)

    if (!isPasswordValid) {
      return this.responseFormatter.error(c, 401, {
        code: 'UNAUTHORIZED',
        message: '帳號或密碼錯誤',
      })
    }

    await this.setSessionCookie(c, user.id)

    return this.responseFormatter.success(c, 200, { data: user })
  }

  public logout: Handler = async c => {
    deleteCookie(c, 'session')
    return this.responseFormatter.success(c, 200, { data: true })
  }
}

export default new AuthController()
