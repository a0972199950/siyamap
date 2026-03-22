import { zValidator } from '@hono/zod-validator'
import { TypedResponse } from 'hono'
import { ZodError, ZodType } from 'zod'

import { ApiErrorResponse } from '@/types'
import logger from '@/utils/logger'

class ReqValidator {
  json(dto: ZodType<any>) {
    return zValidator(
      'json',
      dto,
      (result, c): TypedResponse<ApiErrorResponse> | void => {
        if (!result.success) {
          logger.log('Validation error:', result.error)

          return c.json(
            {
              code: 'API_REQUEST_VALIDATION_ERROR',
              message: result.error.message,
              details: (result.error as ZodError).issues,
            },
            400
          )
        }
      }
    )
  }

  params(dto: ZodType<any>) {
    return zValidator(
      'param',
      dto,
      (result, c): TypedResponse<ApiErrorResponse> | void => {
        if (!result.success) {
          logger.log('Validation error:', result.error)

          return c.json(
            {
              code: 'API_REQUEST_VALIDATION_ERROR',
              message: result.error.message,
              details: (result.error as ZodError).issues,
            },
            400
          )
        }
      }
    )
  }

}

export const reqValidator = new ReqValidator()
