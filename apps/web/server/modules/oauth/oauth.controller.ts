import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

import { Handler } from '@/lib/hono'
import _userService, { UserService } from '@/server/modules/user/user.service'
import { TGetLoginUrlDto } from '@/types/dto'
import _responseFormatter, {
  ResponseFormatter,
} from '@/utils/response-formatter'
import _setSessionCookie from '@/utils/set-session-cookie'

import _oauthService, { OauthService } from './oauth.service'

class OauthController {
  constructor(
    private readonly responseFormatter: ResponseFormatter = _responseFormatter,
    private readonly userService: UserService = _userService,
    private readonly oauthService: OauthService = _oauthService,
    private readonly setSessionCookie = _setSessionCookie
  ) {}

  public generateGoogleLoginUrl: Handler = async c => {
    const csrfToken = await this.oauthService.generateCsrfToken()
    setCookie(c, 'csrf_token', csrfToken, {
      maxAge: 60 * 5, // 5 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    const { from } = (await c.req.query()) as TGetLoginUrlDto

    const loginUrl = await this.oauthService.generateGoogleLoginUrl({
      csrfToken,
      from,
    })

    return this.responseFormatter.success(c, 200, {
      data: { loginUrl },
    })
  }

  public handleGoogleCallback: Handler = async c => {
    const { code, state } = (await c.req.query()) as {
      code: string
      state: string
    }

    if (!code) {
      return this.responseFormatter.error(c, 403, {
        code: 'MISSING_GOOGLE_AUTH_CODE',
        message: 'Google 認證碼缺失',
      })
    }

    const storedCsrfToken = getCookie(c, 'csrf_token')
    const { csrfToken, from } = JSON.parse(
      Buffer.from(state, 'base64').toString('utf-8')
    )

    deleteCookie(c, 'csrf_token')

    if (csrfToken !== storedCsrfToken) {
      return this.responseFormatter.error(c, 403, {
        code: 'CSRF_ERROR',
        message: 'CSRF token 驗證失敗',
      })
    }

    const userInfo =
      await this.oauthService.getGoogleAccessTokenAndUserInfo(code)

    const user = await this.userService.findOrInsert({
      email: userInfo.email,
      username: userInfo.name,
      picture: userInfo.picture,
    })

    await this.setSessionCookie(c, user.id)

    return c.redirect(from || '/')
  }
}

export default new OauthController()
