import { ApiErrorResponse } from '@/types'
import logger from '@/utils/logger'

interface RequestOptions extends Omit<RequestInit, 'method'> {
  params?: Record<string, any>
  body?: any
  disableCookies?: boolean // 選項：在 SSR 時禁用自動 cookie
}

export class RequestClient {
  private baseURL: string

  constructor(baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!) {
    this.baseURL = baseURL
  }

  // 在 SSR 環境中獲取 cookie
  private async getSSRCookies(): Promise<string | null> {
    // 檢查是否在服務端環境
    if (typeof window !== 'undefined') {
      return null // 客戶端不需要處理
    }

    try {
      // 動態導入 Next.js cookies 函數 (App Router)
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()

      // 將所有 cookie 轉換為字串
      const cookieString = cookieStore.toString()
      return cookieString || null
    } catch (error) {
      // 如果無法獲取 cookie (可能在 Pages Router 或其他環境)
      logger.debug('Unable to get SSR cookies:', error)
      return null
    }
  }

  private async handleRequest<T = any>(
    pathOrUrl: string,
    method: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      params,
      body,
      disableCookies,
      headers = {},
      ...fetchOptions
    } = options

    // 構建完整的 URL
    let fullUrl: string
    if (pathOrUrl.startsWith('http')) {
      // 如果是完整 URL，直接使用
      fullUrl = pathOrUrl
    } else {
      // 如果是路徑，拼接 baseURL
      fullUrl = this.baseURL ? `${this.baseURL}${pathOrUrl}` : pathOrUrl
    }

    // 處理查詢參數
    if (params && Object.keys(params).length > 0) {
      // 過濾掉 undefined 和 null 值
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value !== undefined && value !== null
        )
      )
      const searchParams = new URLSearchParams(cleanParams)
      const paramString = searchParams.toString()
      if (paramString) {
        fullUrl += (fullUrl.includes('?') ? '&' : '?') + paramString
      }
    }

    // 準備請求配置
    const requestConfig: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include', // 自動包含 cookie
      ...fetchOptions,
    }

    // 在 SSR 環境中自動添加 cookie
    if (!disableCookies) {
      const ssrCookies = await this.getSSRCookies()
      if (ssrCookies) {
        requestConfig.headers = {
          ...requestConfig.headers,
          Cookie: ssrCookies,
        }
      }
    }

    // 處理請求體
    if (body !== undefined) {
      // 只有純 JavaScript object 才需要 JSON 序列化
      const isBodyPlainObject =
        body && typeof body === 'object' && body.constructor === Object

      if (isBodyPlainObject) {
        requestConfig.body = JSON.stringify(body)
      } else {
        // 其他類型（string, FormData, URLSearchParams, Blob等）直接使用
        requestConfig.body = body
        // 如果是 FormData，移除 Content-Type 讓瀏覽器自動設置
        if (body instanceof FormData && requestConfig.headers) {
          delete requestConfig.headers[
            'Content-Type' as keyof typeof requestConfig.headers
          ]
        }
      }
    }

    try {
      const response = await fetch(fullUrl, requestConfig)

      // 當 response.ok !== true 時拋出錯誤
      if (!response.ok) {
        let errorData: any
        try {
          errorData = await response.json()
          logger.log('API 原始錯誤: ', errorData)
        } catch {
          // 如果無法解析 JSON，使用 response.statusText
          errorData = { message: response.statusText, status: response.status }
        }

        // 判斷是否為 ApiErrorResponse 格式
        let finalErrorData: ApiErrorResponse
        if (
          errorData &&
          typeof errorData === 'object' &&
          'code' in errorData &&
          'message' in errorData
        ) {
          // 是 ApiErrorResponse，直接使用
          finalErrorData = errorData as ApiErrorResponse
        } else {
          // 不是 ApiErrorResponse，轉換格式
          finalErrorData = {
            code: 'UNKNOWN_ERROR',
            message:
              errorData?.message || response.statusText || 'Unknown error',
          }
        }

        const error = new Error(
          `Request failed with status ${response.status}`,
          {
            cause: {
              response,
              data: finalErrorData,
            },
          }
        )
        throw error
      }

      // 嘗試解析 JSON 回應
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }

      // 對於非 JSON 回應，返回 text
      return (await response.text()) as unknown as T
    } catch (error) {
      // 如果是我們拋出的請求錯誤，直接重新拋出
      if (
        error instanceof Error &&
        error.cause &&
        typeof error.cause === 'object' &&
        'response' in error.cause
      ) {
        throw error
      }

      // 對於其他錯誤（如網路錯誤），包裝成統一格式
      throw new Error(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        {
          cause: {
            data: {
              code: 'NETWORK_ERROR',
              message: error instanceof Error ? error.message : 'Unknown error',
            },
          },
        }
      )
    }
  }

  get<T = any>(url: string, options?: RequestOptions): Promise<T> {
    return this.handleRequest<T>(url, 'GET', options)
  }

  post<T = any>(url: string, options?: RequestOptions): Promise<T> {
    return this.handleRequest<T>(url, 'POST', options)
  }

  put<T = any>(url: string, options?: RequestOptions): Promise<T> {
    return this.handleRequest<T>(url, 'PUT', options)
  }

  delete<T = any>(url: string, options?: RequestOptions): Promise<T> {
    return this.handleRequest<T>(url, 'DELETE', options)
  }

  patch<T = any>(url: string, options?: RequestOptions): Promise<T> {
    return this.handleRequest<T>(url, 'PATCH', options)
  }
}

// 創建默認實例
const request = new RequestClient()

// 也可以創建帶有 baseURL 的實例
export const createRequest = (baseURL?: string) => new RequestClient(baseURL)

export default request
export type { RequestOptions }
