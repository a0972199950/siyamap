import { Handler } from '@/lib/hono'
import { TCreateFileDto } from '@/types/dto'
import ResponseFormatter from '@/utils/response-formatter'

import fileService from './file.service'

class FileController extends ResponseFormatter {
  public upload: Handler = async c => {
    const createFileDto = (await c.req.json()) as TCreateFileDto
    const user = c.get('user')

    const data = await fileService.createFile(createFileDto, user!.id)

    return this.formatSuccessResponse(c, 200, { data })
  }
}

export default new FileController()
