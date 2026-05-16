import path from 'path'

import { addWatermarkToImage, handler } from '../src/index'

describe('addWatermarkToImage', () => {
  test('It adds watermark', async () => {
    await addWatermarkToImage(path.join(__dirname, './source.jpg'), path.join(__dirname, './output.jpg'))
    const outputBuffer = await addWatermarkToImage(path.join(__dirname, './source.jpg'))
    expect(outputBuffer).toBeDefined()
  })
})

describe('handler', () => {
  test('It can listen s3 event', async () => {
    const testS3Event = {
      Records: [
        {
          s3: {
            bucket: { name: "siyamap-images" },
            object: { key: "019e301a-4ce4-75d6-9981-6d5db50387ae.jpg" }
          }
        }
      ]
    }

    await handler(testS3Event as any, {} as any, () => {})

    expect(true).toBe(true)
  }, 60_000)
})
