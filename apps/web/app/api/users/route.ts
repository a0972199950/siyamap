import { NextRequest } from 'next/server'
import userController from '@/server/modules/user/user.controller'

export const POST = (req: NextRequest) => userController.insert(req)
export const GET = (req: NextRequest) => userController.findAll(req)
