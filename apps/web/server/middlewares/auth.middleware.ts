import { getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import { jwtVerify } from 'jose'

import { Variables } from '@/lib/hono'
import userService from '@/server/modules/user/user.service'
import logger from '@/utils/logger'

class AuthMiddleware {
  setUser = createMiddleware<{ Variables: Variables }>(async (c, next) => {
    const session = getCookie(c, 'session')

    if (!session) {
      return next()
    }

    try {
      const secret = process.env.SESSION_JWT_SECRET
      if (!secret) {
        return next()
      }

      const secretKey = new TextEncoder().encode(secret)
      const { payload } = await jwtVerify<{ userId: string }>(
        session,
        secretKey
      )
      const { userId } = payload

      logger.debug('userId:', userId)

      const user = await userService.findOne({ id: userId })
      c.set('user', user)

      return next()
    } catch (error) {
      return next()
    }
  })

  requireLoggedIn = createMiddleware<{ Variables: Variables }>(
    async (c, next) => {
      const user = c.get('user')

      if (!user) {
        logger.debug('Unauthorized access attempt to:', c.req.url)

        return c.json(
          {
            code: 'UNAUTHORIZED',
            message: '使用者未登入',
          },
          401
        )
      }

      return next()
    }
  )

  requireAdmin = createMiddleware<{ Variables: Variables }>(async (c, next) => {
    const user = c.get('user')

    if (!user || user.role !== 'ADMIN') {
      logger.debug('Unauthorized access attempt to:', c.req.url)

      return c.json(
        {
          code: 'UNAUTHORIZED',
          message: '使用者沒有管理員權限',
        },
        403
      )
    }

    return next()
  })
}

export default new AuthMiddleware()
