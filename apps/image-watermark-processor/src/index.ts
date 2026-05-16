import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { S3Handler } from 'aws-lambda'
import fs from 'fs'
import path from 'path'
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

export async function addWatermarkToImage(image: Buffer | string, outputPath: string): Promise<true>
export async function addWatermarkToImage(image: Buffer | string, outputPath?: undefined): Promise<Buffer>
export async function addWatermarkToImage(image: Buffer | string, outputPath?: string): Promise<Buffer | true> {
  let imageBuffer

  if (typeof imageBuffer === 'string') {
    imageBuffer = fs.readFileSync(image)
  } else {
    imageBuffer = image
  }

  const { width: imgWidth, height: imgHeight } = await sharp(imageBuffer).metadata()

  // 水印縮小至圖片寬度的 20%（不個別旋轉，稍後整體旋轉）
  const watermarkSize = Math.floor(imgWidth! * 0.2)
  const watermark = await sharp(path.join(__dirname, '../assets/watermark.png'))
    .resize(watermarkSize, watermarkSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  const { width: wmW, height: wmH } = await sharp(watermark).metadata()
  const stepX = wmW! // 水平間距
  const stepY = wmH! // 垂直間距
  const halfStepX = Math.floor(stepX / 2)

  // 為了在整體旋轉 45 度後仍能覆蓋整張圖，需要一張邊長 >= 對角線的正方形畫布
  const diagonal = Math.ceil(Math.sqrt(imgWidth! ** 2 + imgHeight! ** 2))
  const canvasSize = diagonal + stepX * 2 + stepY * 2

  // 以磚塊錯位方式平鋪水印：每行起始點往後退半個單位（交錯排列）
  const composites: sharp.OverlayOptions[] = []
  let rowIdx = 0
  for (let y = 0; y < canvasSize; y += stepY) {
    const offsetX = rowIdx % 2 === 0 ? 0 : halfStepX
    for (let x = offsetX; x < canvasSize; x += stepX) {
      composites.push({ input: watermark, left: x, top: y })
    }
    rowIdx++
  }

  // 先把平鋪結果輸出成 buffer
  // （sharp 的 pipeline 操作順序是固定的，rotate 會在 composite 之前套用，
  //   所以必須先輸出後再用新的 pipeline 做旋轉）
  const tiled = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .png()
    .toBuffer()

  // 將整張平鋪後的圖層逆時鐘旋轉 45 度
  const rotatedTiled = await sharp(tiled)
    .rotate(-45, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  // 從旋轉後的圖層中心裁切回原圖大小，作為最終覆蓋層
  const { width: rW, height: rH } = await sharp(rotatedTiled).metadata()
  const overlay = await sharp(rotatedTiled)
    .extract({
      left: Math.floor((rW! - imgWidth!) / 2),
      top: Math.floor((rH! - imgHeight!) / 2),
      width: imgWidth!,
      height: imgHeight!,
    })
    .png()
    .toBuffer()

  if (outputPath) {
    await sharp(imageBuffer)
      .composite([{ input: overlay, blend: 'over' }])
      .jpeg({ quality: 85 })
      .toFile(outputPath)

    return true
  } else {
    return await sharp(imageBuffer)
      .composite([{ input: overlay, blend: 'over' }])
      .jpeg({ quality: 85 })
      .toBuffer()
  }
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

    const outputBuffer = await addWatermarkToImage(inputBuffer)

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

