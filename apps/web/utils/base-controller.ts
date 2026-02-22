import { NextResponse } from 'next/server'
import { ApiSuccessResponse, ApiErrorResponse } from '@/types'
import ErrorCode from '@/types/error-code'

class BaseController {
  formatSuccessResponse(
    result: ApiSuccessResponse<any>,
    status: number = 200
  ): NextResponse<ApiSuccessResponse<any>> {
    return NextResponse.json(result, { status })
  }

  formatErrorResponse(
    code: ErrorCode,
    message: string = '',
    status: number = 500
  ): NextResponse<ApiErrorResponse> {
    return NextResponse.json({ code, message }, { status })
  }
}

export default BaseController
