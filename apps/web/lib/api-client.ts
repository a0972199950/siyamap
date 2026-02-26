import { z,ZodError } from 'zod'

import { ApiErrorResponse,ApiSuccessResponse } from '@/types'
import {
  TCreateFileDto,
  TFileDto,
  TInsertUserDto,
  TUserDto,
  UserDto,
} from '@/types/dto'

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
    resDataSchema: z.ZodSchema<T> | null,
    init: RequestInit
  ) => {
    try {
      const fullUrl = this.buildUrl(path)
      const res = await fetch(fullUrl, init)
      const result = await res.json()

      if (!res.ok) {
        throw new Error('API 請求失敗', {
          cause: result as ApiErrorResponse,
        })
      }

      if (resDataSchema) {
        const validatedData = resDataSchema.parse(result.data)
        return { ...result, data: validatedData } as ApiSuccessResponse<T>
      }

      return result as ApiSuccessResponse<T>
    } catch (err) {
      console.error(`API client error ${init.method} ${path}`)
      console.error(err)

      if (err instanceof ZodError) {
        throw new Error('Response 回傳有問題', {
          cause: {
            code: 'API_RESPONSE_VALIDATION_ERROR',
            message: `Invalid response format: ${err.message}`,
            details: err.issues,
          } as ApiErrorResponse,
        })
      }

      throw err
    }
  }

  public get = <T>(
    path: string,
    resDataSchema: z.ZodSchema<T> | null,
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
    resDataSchema: z.ZodSchema<T> | null,
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
  public getUsers = () => this.get<TUserDto[]>('/api/users', z.array(UserDto))

  public insertUser = (dto: TInsertUserDto) =>
    this.post<TUserDto>('/api/users', UserDto, {
      body: JSON.stringify(dto),
    })

  // upload API
  public createFile = (dto: TCreateFileDto) =>
    this.post<{ file: TFileDto; uploadUrl: string }>('/api/files', null, {
      body: JSON.stringify(dto),
    })
}

export default new Api()
