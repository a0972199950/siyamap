import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.onError((err, c) => {
  console.error(err)

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
