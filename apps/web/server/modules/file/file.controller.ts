import { Handler } from '@/lib/hono'
import { TCreateFileDto } from '@/types/dto'
import _responseFormatter, {
  ResponseFormatter,
} from '@/utils/response-formatter'

import _fileService, { FileService } from './file.service'

class FileController {
  constructor(
    private readonly responseFormatter: ResponseFormatter = _responseFormatter,
    private readonly fileService: FileService = _fileService
  ) {}

  public upload: Handler = async c => {
    const createFileDto = (await c.req.json()) as TCreateFileDto
    const user = c.get('user')

    const data = await this.fileService.createFile(createFileDto, user!.id)

    return this.responseFormatter.success(c, 200, { data })
  }
}

export default new FileController()
