import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl as _getSignedUrl } from '@aws-sdk/s3-request-presigner'
import mime from 'mime-types' // 需要安裝 npm install mime-types
import { v7 as uuid } from 'uuid'

import _s3Client from '@/lib/aws-s3-client'
import _db from '@/lib/db'
import { files } from '@/server/schema'
import { TCreateFileDto } from '@/types/dto'

export class FileService {
  constructor(
    private readonly db = _db,
    private readonly s3Client = _s3Client,
    private readonly getSignedUrl = _getSignedUrl
  ) {}

  public async createFile(dto: TCreateFileDto, userId: string) {
    const { fileType } = dto

    const extension = mime.extension(fileType)
    const fileName = `${uuid()}.${extension}`

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_IMAGE_UPLOAD,
      Key: fileName,
      ContentType: fileType,
    })

    const uploadUrl = await this.getSignedUrl(this.s3Client, command, {
      expiresIn: 3600,
    })

    const [file] = await this.db
      .insert(files)
      .values({
        url: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${fileName}`,

        fileName,

        userId,
      })
      .returning()

    return {
      file,
      uploadUrl,
    }
  }
}

export default new FileService()
