import ErrorCode from '@/types/error-code'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface Pagination {
  page: number
  pageSize: number
  total: number
}

export type ApiSuccessResponse<T> = {
  data: T
  pagination?: Pagination
}

export type ApiErrorResponse = {
  code: ErrorCode
  message?: string
  details?: any
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export interface OAuthState {
  csrfToken: string
  from: string
}
