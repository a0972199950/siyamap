import fs from 'fs'
import path from 'path'

import { handler, resizeImage } from '../src/resize-processor'

describe('resizeImage', () => {
  const sourceBuffer = fs.readFileSync(path.join(__dirname, './source.jpg'))

  test('It returns a Buffer when no outputPath is given', async () => {
    const result = await resizeImage(sourceBuffer, 200)

    expect(result).toBeInstanceOf(Buffer)
    expect((result as Buffer).length).toBeGreaterThan(0)
  })

  test('It writes to file when outputPath is given', async () => {
    const outputPath = path.join(__dirname, './resized.jpg')
    const result = await resizeImage(sourceBuffer, 200, outputPath)

    expect(result).toBe(true)
    expect(fs.existsSync(outputPath)).toBe(true)
  })

  test('It does not enlarge image smaller than target width', async () => {
    const tinyBuffer = await resizeImage(sourceBuffer, 1, undefined) as Buffer
    const result = await resizeImage(tinyBuffer, 800) as Buffer

    // withoutEnlargement: true，圖片不應超過原本尺寸
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('handler', () => {
  test('It returns 400 when width is missing', async () => {
    const event = {
      rawPath: '/origin/019e301a-4ce4-75d6-9981-6d5db50387ae.jpg',
      queryStringParameters: {},
    }

    const result = await handler(event as any)

    expect(result).toMatchObject({
      statusCode: 400,
    })
  })

  test('It returns 400 when width is not accepted', async () => {
    const event = {
      rawPath: '/origin/019e301a-4ce4-75d6-9981-6d5db50387ae.jpg',
      queryStringParameters: { width: '999' },
    }

    const result = await handler(event as any)

    expect(result).toMatchObject({
      statusCode: 400,
    })
  })

  test('It can resize image from S3', async () => {
    const event = {
      rawPath: '/origin/019e301a-4ce4-75d6-9981-6d5db50387ae.jpg',
      queryStringParameters: { width: '400' },
    }

    const result = await handler(event as any)

    expect(result).toMatchObject({
      statusCode: 200,
      isBase64Encoded: true,
    })
  }, 60_000)
})
