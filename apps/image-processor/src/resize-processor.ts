import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import sharp from 'sharp'
import { Readable } from 'stream'

import { getS3ObjectKeyFromPath, streamToBuffer } from './utils'

const ACCEPTED_IMAGE_WIDTHS = ['200', '400', '800']

export const resizeImage = async (inputBuffer: Buffer, width: number, outputPath?: string) => {
  if (outputPath) {
    await sharp(inputBuffer)
      .resize({
        width: width,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFile(outputPath)

    return true
  } else {
    return sharp(inputBuffer)
      .resize({
        width: width,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toBuffer()
  }
}

export const handler = async (event: APIGatewayProxyEventV2) => {
  const width = event.queryStringParameters?.width
  const path = event.rawPath

  if (!width || !ACCEPTED_IMAGE_WIDTHS.includes(width)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `[錯誤] Invalid width parameter: ${width}` }),
    }
  }

  const { folder, key } = getS3ObjectKeyFromPath(path)

  const s3Client = new S3Client({
    region: process.env.AWS_REGION_S3_IMAGE_UPLOAD,
  })

  const response = await s3Client.send(new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_IMAGE_UPLOAD,
    Key: `${folder}/${key}`
  }))

  if (!response.Body) {
    throw new Error('[錯誤] 找不到 S3 物件內容')
  }

  const inputBuffer = await streamToBuffer(response.Body as Readable)

  const outputBuffer = await resizeImage(inputBuffer, parseInt(width))

  console.log(
    `[資訊] 壓縮圖片成功: s3://${process.env.AWS_S3_BUCKET_IMAGE_UPLOAD}/${folder}/${key} → width=${width}`,
  )

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'image/jpeg' },
    body: outputBuffer.toString('base64'),
    isBase64Encoded: true,
  }
}
