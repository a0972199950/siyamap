import { app, handle } from '@/lib/hono'

import '@/server/modules/health-check/health-check.route'
import '@/server/modules/user/user.route'
import '@/server/modules/upload/upload.route'

export const runtime = 'edge'

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const OPTIONS = handle(app)
