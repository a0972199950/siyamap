import { ZodError, z } from 'zod'
import { TInsertUserDto, UserDto } from '@/types/dto'
import { ApiSuccessResponse, ApiErrorResponse } from '@/types'

class Api {
  private getBaseUrl() {
    // 檢查是否在服務器端
    if (typeof window === 'undefined') {
      // SSR 環境 - 使用環境變數或默認值
      return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
    }
    // 客戶端 - 使用當前域名
    return window.location.origin
  }

  private buildUrl(path: string) {
    const baseUrl = this.getBaseUrl()
    return `${baseUrl}${path}`
  }

  private request = async <T>(
    path: string,
    resDataSchema: z.ZodSchema<T>,
    init: RequestInit
  ) => {
    try {
      const fullUrl = this.buildUrl(path)
      const res = await fetch(fullUrl, init)
      const result = await res.json()

      if (!res.ok) {
        throw new Error(JSON.stringify(result))
      }

      const validatedData = resDataSchema.parse(result.data)

      return { ...result, data: validatedData } as ApiSuccessResponse<T>
    } catch (err) {
      console.error(`API client error ${init.method} ${path}:`, err)

      if (err instanceof ZodError) {
        throw new Error(
          JSON.stringify({
            code: 'API_RESPONSE_VALIDATION_ERROR',
            message: `Invalid response format: ${err.issues.map(issue => issue.path.join('.')).join(', ')}`,
            extra: err.issues,
          })
        )
      }

      throw err as ApiErrorResponse
    }
  }

  public get = <T>(
    path: string,
    resDataSchema: z.ZodSchema<T>,
    options: RequestInit & { query?: Record<string, any> } = {}
  ) => {
    const { query, ...reqConfig } = options
    const queryParams = new URLSearchParams(query).toString()
    const fullPath = queryParams ? `${path}?${queryParams}` : path

    return this.request(fullPath, resDataSchema, {
      ...reqConfig,
      method: 'GET',
    })
  }

  public post = <T>(
    path: string,
    resDataSchema: z.ZodSchema<T>,
    options: RequestInit = {}
  ) => {
    const { headers: originalHeaders, ...restOptions } = options
    const headers = (originalHeaders as Record<string, string>) || {}

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }

    return this.request(path, resDataSchema, {
      ...restOptions,
      headers,
      method: 'POST',
    })
  }

  // users API
  public getUsers = () => this.get('/api/users', z.array(UserDto))
  public insertUser = (payload: TInsertUserDto) =>
    this.post('/api/users', UserDto, { body: JSON.stringify(payload) })
}

export default new Api()
