import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import mime from 'mime-types' // 需要安裝 npm install mime-types
import { v7 as uuid } from 'uuid'
import s3Client from '@/lib/aws-s3-client'
import { TCreateUploadUrlDto } from '@/types/dto'

class UploadService {
  public async createUploadUrl(dto: TCreateUploadUrlDto) {
    const { fileType } = dto

    const extension = mime.extension(fileType)
    const fileName = `${uuid()}.${extension}`

    const command = new PutObjectCommand({
      Bucket: 'siyamap-images',
      Key: fileName,
      ContentType: fileType,
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    return uploadUrl
  }
}

export default new UploadService()
