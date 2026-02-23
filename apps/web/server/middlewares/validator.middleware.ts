import { TypedResponse } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { ZodType } from 'zod'
import { ApiErrorResponse } from '@/types'

class BodyValidator {
  public json(dto: ZodType<any>) {
    return zValidator(
      'json',
      dto,
      (result, c): TypedResponse<ApiErrorResponse> | void => {
        if (!result.success) {
          console.log('Validation error:', result.error)

          return c.json(
            {
              code: 'API_REQUEST_VALIDATION_ERROR',
              message: result.error.message,
            },
            400
          )
        }
      }
    )
  }
}

export const bodyValidator = new BodyValidator()
