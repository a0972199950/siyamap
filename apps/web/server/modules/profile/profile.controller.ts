import { Handler } from '@/lib/hono'
import { UserDto } from '@/types/dto'
import ResponseFormatter from '@/utils/response-formatter'

class ProfileController extends ResponseFormatter {
  public getProfile: Handler = async c => {
    const user = c.get('user')

    return this.formatSuccessResponse(c, 200, {
      data: UserDto.parse(user),
    })
  }
}

export default new ProfileController()
