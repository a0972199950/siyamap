import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import logger from '@/utils/logger'

const app = new Hono().basePath('/api')

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
