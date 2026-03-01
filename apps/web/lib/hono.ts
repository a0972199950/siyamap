import { Handler as HonoHandler, Hono } from 'hono'
import { handle } from 'hono/vercel'

import authMiddleware from '@/server/middlewares/auth.middleware'
import { User } from '@/server/schema'
import logger from '@/utils/logger'

export type Variables = {
  user?: User
}

export type Handler = HonoHandler<{ Variables: Variables }>

const app = new Hono<{ Variables: Variables }>().basePath('/api')

app.use('*', authMiddleware.setUser)

app.onError((err, c) => {
  logger.error(err)

  return c.json(
    {
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
      details: err.cause,
    },
    500
  )
})

export { app, handle }
