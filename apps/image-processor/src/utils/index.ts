import { Readable } from 'stream'

/**
 * Stream → Buffer
 */
export const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = []

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk))
  }

  return Buffer.concat(chunks)
}

export const getS3ObjectKeyFromPath = (path: string) => {
  const parts = decodeURIComponent(path.replace(/^\//, '')).split('/')

  let folder
  let key

  if (parts.length === 1) {
    folder = ''
    key = parts[0]
  } else {
    folder = parts.slice(0, -1).join('/')
    key = parts[parts.length - 1]
  }

  return { folder, key }
}
