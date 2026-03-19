import { Handler } from '@/lib/hono'
import { UserDto } from '@/types/dto'
import _responseFormatter, {
  ResponseFormatter,
} from '@/utils/response-formatter'

class ProfileController {
  constructor(
    private readonly responseFormatter: ResponseFormatter = _responseFormatter
  ) {}

  public getProfile: Handler = async c => {
    const user = c.get('user')

    return this.responseFormatter.success(c, 200, {
      data: UserDto.parse(user),
    })
  }
}

export default new ProfileController()
