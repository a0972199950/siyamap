import '@/server/modules/health-check/health-check.route'
import '@/server/modules/user/user.route'
import '@/server/modules/file/file.route'
import '@/server/modules/oauth/oauth.route'
import '@/server/modules/auth/auth.route'
import '@/server/modules/profile/profile.route'

import { app, handle } from '@/lib/hono'

export const runtime = 'nodejs'

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const OPTIONS = handle(app)
