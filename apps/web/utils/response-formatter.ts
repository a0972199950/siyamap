import { Context, TypedResponse } from 'hono'
import { ContentfulStatusCode,StatusCode } from 'hono/utils/http-status'

import { ApiErrorResponse,ApiSuccessResponse } from '@/types'

class ResponseFormatter {
  formatSuccessResponse(
    c: Context,
    status: StatusCode = 200,
    result: ApiSuccessResponse<any>
  ): TypedResponse<ApiSuccessResponse<any>> | Response {
    if ([101, 204, 205, 304].includes(status)) {
      return c.body(null, status)
    }

    return c.json(result, status as ContentfulStatusCode)
  }

  formatErrorResponse(
    c: Context,
    status: StatusCode = 500,
    result: ApiErrorResponse
  ): TypedResponse<ApiErrorResponse> | Response {
    if ([101, 204, 205, 304].includes(status)) {
      return c.body(null, status)
    }

    return c.json(result, status as ContentfulStatusCode)
  }
}

export default ResponseFormatter
