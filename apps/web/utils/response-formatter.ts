import { Context, TypedResponse } from 'hono'
import { ContentfulStatusCode, StatusCode } from 'hono/utils/http-status'

import { ApiErrorResponse, ApiSuccessResponse } from '@/types'

const DEFAULT_SUCCESS_STATUS = 200
const DEFAULT_ERROR_STATUS = 500

export class ResponseFormatter {
  success(
    c: Context,
    status: StatusCode = DEFAULT_SUCCESS_STATUS,
    result: ApiSuccessResponse<any>
  ): TypedResponse<ApiSuccessResponse<any>> | Response {
    if ([101, 204, 205, 304].includes(status)) {
      return c.body(null, status)
    }

    return c.json(result, status as ContentfulStatusCode)
  }

  error(
    c: Context,
    status: StatusCode = DEFAULT_ERROR_STATUS,
    result: ApiErrorResponse
  ): TypedResponse<ApiErrorResponse> | Response {
    if ([101, 204, 205, 304].includes(status)) {
      return c.body(null, status)
    }

    return c.json(result, status as ContentfulStatusCode)
  }
}

export default new ResponseFormatter()
