import ResponseFormatter from '@/utils/response-formatter'
import { Handler } from 'hono'
import { TCreateUploadUrlDto } from '@/types/dto'
import uploadService from './upload.service'

class UploadController extends ResponseFormatter {
  public upload: Handler = async c => {
    try {
      const data = (await c.req.json()) as TCreateUploadUrlDto
      const uploadUrl = await uploadService.createUploadUrl(data)

      return this.formatSuccessResponse(c, 200, { data: uploadUrl })
    } catch (err: any) {
      console.error('UserController insert error', err)

      return this.formatErrorResponse(c, 500, {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message,
      })
    }
  }
}

export default new UploadController()
