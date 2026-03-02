import { Context } from 'hono'
import { setCookie } from 'hono/cookie'
import { SignJWT } from 'jose'

const setSessionCookie = async (c: Context, userId: number) => {
  const secret = new TextEncoder().encode(process.env.SESSION_JWT_SECRET!)

  const sessionJwt = await new SignJWT({ userId })
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

  return true
}

export default setSessionCookie
