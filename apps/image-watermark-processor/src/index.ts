import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { S3Handler } from 'aws-lambda'
import sharp from 'sharp'
import { Readable } from 'stream'

/**
 * Stream → Buffer
 */
const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = []

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk))
  }

  return Buffer.concat(chunks)
}

export const handler: S3Handler = async (s3Event) => {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION_S3_IMAGE_UPLOAD,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  })

  for (const record of s3Event.Records) {
    console.log(record.s3.bucket.name)
    console.log(record.s3.object.key)

    const response = await s3Client.send(new GetObjectCommand({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key
    }))

    if (!response.Body) {
      throw new Error('S3 object body is empty')
    }

    const inputBuffer = await streamToBuffer(response.Body as Readable)

    const outputBuffer = await sharp(inputBuffer)
      .composite([{
        input: './watermark.png',
        gravity: 'southeast',
        blend: 'over',
        tile: true
      }])
      .jpeg({
        quality: 85,
      })
      .toBuffer()

    await s3Client.send(new PutObjectCommand({
      Bucket: 'siyamap-images-watermark',
      Key: record.s3.object.key,
      Body: outputBuffer,
      ContentType: 'image/jpeg',
    }))

    console.log(
      `Uploaded processed image: s3://siyamap-images-watermark/${record.s3.object.key}`,
    )
  }
}
