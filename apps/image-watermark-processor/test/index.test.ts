import path from 'path'

import { addWatermarkToImage } from '../src/index'

describe('addWatermarkToImage', () => {
  test('It adds watermark', async () => {
    await addWatermarkToImage(path.join(__dirname, './source.jpg'), path.join(__dirname, './output.jpg'))
    const outputBuffer = await addWatermarkToImage(path.join(__dirname, './source.jpg'))
    expect(outputBuffer).toBeDefined()
  })
})
