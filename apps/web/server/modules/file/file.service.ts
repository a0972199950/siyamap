import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import mime from 'mime-types' // 需要安裝 npm install mime-types
import { v7 as uuid } from 'uuid'

import s3Client from '@/lib/aws-s3-client'
import db from '@/lib/db'
import { TCreateFileDto } from '@/types/dto'

import { files } from './file.schema'

class FileService {
  public async createFile(dto: TCreateFileDto) {
    const { fileType } = dto

    const extension = mime.extension(fileType)
    const fileName = `${uuid()}.${extension}`

    const command = new PutObjectCommand({
      Bucket: 'siyamap-images',
      Key: fileName,
      ContentType: fileType,
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    const [file] = await db
      .insert(files)
      .values({
        url: `https://${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${fileName}`,

        fileName,
      })
      .returning()

    return {
      file,
      uploadUrl,
    }
  }
}

export default new FileService()
