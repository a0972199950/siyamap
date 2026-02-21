import { NextRequest } from 'next/server'
import { CreateUserSchema } from './dto'
import userService from './user.service'
import ApiResponse from '@/utils/api-response'

class UserController {
  static async insert(req: NextRequest) {
    try {
      const data = await req.json()
      const validatedData = CreateUserSchema.parse(data)

      const newUser = await userService.insert(validatedData)

      return ApiResponse.success(newUser, 201)
    } catch (err: any) {
      console.error('創建使用者失敗:', err)

      if (err.name === 'ZodError') {
        // TODO: 製作統一的錯誤格式
        return ApiResponse.error(err, 400)
      }

      return ApiResponse.error(err, 500)
    }
  }

  static async findAll() {
    try {
      const users = await userService.findAll()
      return ApiResponse.success(users)
    } catch (err: any) {
      console.error('取得使用者失敗:', err)

      return ApiResponse.error(err, 500)
    }
  }
}

export default UserController
