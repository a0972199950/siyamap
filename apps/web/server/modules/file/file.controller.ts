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
    const { fileType, withWatermark } = createFileDto

    if (withWatermark && !fileType.startsWith('image/')) {
      return this.responseFormatter.error(c, 400, {
        code: 'INVALID_FILE_TYPE_FOR_WATERMARK',
        message: 'Watermark can only be applied to image files',
      })
    }

    const fileFolder = withWatermark ? 'origin' : 'static'

    const data = await this.fileService.createFile(
      fileType,
      fileFolder,
      user!.id
    )

    return this.responseFormatter.success(c, 200, { data })
  }
}

export default new FileController()
