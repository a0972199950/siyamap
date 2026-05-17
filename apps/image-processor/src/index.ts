import type { APIGatewayProxyEventV2,S3Event } from 'aws-lambda'

import { handler as resizeHandler } from './resize-processor'
import { handler as watermarkHandler } from './watermark-processor'

const isS3Event = (event: S3Event | APIGatewayProxyEventV2): event is S3Event =>
  Array.isArray((event as S3Event).Records) &&
  (event as S3Event).Records[0]?.eventSource === 'aws:s3'

const isApiGatewayProxyEvent = (
  event: S3Event | APIGatewayProxyEventV2,
): event is APIGatewayProxyEventV2 =>
  'requestContext' in event && 'version' in event

export const handler = async (event: S3Event | APIGatewayProxyEventV2) => {
  if (isS3Event(event)) {
    return watermarkHandler(event)
  }

  if (isApiGatewayProxyEvent(event)) {
    return resizeHandler(event)
  }

  throw new Error(`[錯誤] 不支援的事件類型: ${JSON.stringify(event)}`)
}
