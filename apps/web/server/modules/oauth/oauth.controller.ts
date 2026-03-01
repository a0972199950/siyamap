import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { SignJWT } from 'jose'

import { Handler } from '@/lib/hono'
import userService from '@/server/modules/user/user.service'
import { TGetLoginUrlDto } from '@/types/dto'
import ResponseFormatter from '@/utils/response-formatter'

import oauthService from './oauth.service'

class OauthController extends ResponseFormatter {
  public generateGoogleLoginUrl: Handler = async c => {
    const csrfToken = await oauthService.generateCsrfToken()
    setCookie(c, 'csrf_token', csrfToken, {
      maxAge: 60 * 5, // 5 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    const { from } = (await c.req.query()) as TGetLoginUrlDto

    const loginUrl = await oauthService.generateGoogleLoginUrl({
      csrfToken,
      from,
    })

    return this.formatSuccessResponse(c, 200, { data: { loginUrl } })
  }

  public handleGoogleCallback: Handler = async c => {
    const { code, state } = (await c.req.query()) as {
      code: string
      state: string
    }

    if (!code) {
      return this.formatErrorResponse(c, 403, {
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
      return this.formatErrorResponse(c, 403, {
        code: 'CSRF_ERROR',
        message: 'CSRF token 驗證失敗',
      })
    }

    const userInfo = await oauthService.getGoogleAccessTokenAndUserInfo(code)

    const user = await userService.findOrInsert({
      email: userInfo.email,
      username: userInfo.name,
      picture: userInfo.picture,
    })

    const { id } = user

    const secret = new TextEncoder().encode(process.env.SESSION_JWT_SECRET!)

    const sessionJwt = await new SignJWT({ userId: id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d') // 7 days
      .sign(secret)

    setCookie(c, 'session', sessionJwt, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return c.redirect(from || '/')
  }
}

export default new OauthController()
