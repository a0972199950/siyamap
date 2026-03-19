import { Handler } from '@/lib/hono'
import { TInsertUserDto } from '@/types/dto'
import { UserDto } from '@/types/dto'
import _responseFormatter, {
  ResponseFormatter,
} from '@/utils/response-formatter'

import _userService, { UserService } from './user.service'

class UserController {
  constructor(
    private readonly responseFormatter: ResponseFormatter = _responseFormatter,
    private readonly userService: UserService = _userService
  ) {}

  public insert: Handler = async c => {
    const data = (await c.req.json()) as TInsertUserDto

    let newUser = null

    try {
      newUser = await this.userService.insert(data)
    } catch (err) {
      return this.responseFormatter.error(c, 400, {
        code: 'USER_EXISTS',
        message: '使用者已存在',
        details: err instanceof Error ? err.message : 'Unknown error',
      })
    }

    return this.responseFormatter.success(c, 201, {
      data: UserDto.parse(newUser),
    })
  }

  public findAll: Handler = async c => {
    const users = await this.userService.findAll()
    return this.responseFormatter.success(c, 200, {
      data: UserDto.array().parse(users),
    })
  }
}

export default new UserController()
