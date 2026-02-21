import UserController from '@/server/modules/user/user.controller'

export const POST = UserController.insert
export const GET = UserController.findAll
