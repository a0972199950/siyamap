import { OAuthState } from '@/types'
import logger from '@/utils/logger'
import request from '@/utils/request'

const AUTH_PROVIDERS = {
  GOOGLE: {
    AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    TOKEN_URL: 'https://oauth2.googleapis.com/token',
    USERINFO_URL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    REDIRECT_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL! +
      process.env.NEXT_PUBLIC_OAUTH_CALLBACK_GOOGLE!,
  },
}

interface GoogleTokenResponse {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  id_token: string
}

interface GoogleUserInfo {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
}

class OauthService {
  public generateCsrfToken() {
    const array = new Uint8Array(64) // 建立一個 64 位元組的陣列
    crypto.getRandomValues(array) // 填入隨機數

    // 將陣列轉換為十六進位字串
    const token = Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    return token
  }

  public async generateGoogleLoginUrl(state: OAuthState) {
    const authQueryParams = new URLSearchParams({
      redirect_uri: AUTH_PROVIDERS.GOOGLE.REDIRECT_URL,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      response_type: 'code',
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: Buffer.from(JSON.stringify(state)).toString('base64'),
    }).toString()

    const url = `${AUTH_PROVIDERS.GOOGLE.AUTH_URL}?${authQueryParams}`
    return url
  }

  public async getGoogleAccessTokenAndUserInfo(code: string) {
    const tokenData = await request.post<GoogleTokenResponse>(
      AUTH_PROVIDERS.GOOGLE.TOKEN_URL,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          redirect_uri: AUTH_PROVIDERS.GOOGLE.REDIRECT_URL,
          grant_type: 'authorization_code',
        }),
      }
    )

    const userInfo = await request.get<GoogleUserInfo>(
      AUTH_PROVIDERS.GOOGLE.USERINFO_URL,
      {
        params: {
          access_token: tokenData.access_token,
        },
      }
    )

    return userInfo
  }
}

export default new OauthService()
