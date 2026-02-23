import ErrorCode from '../types/error-code'

interface ErrorInput {
  code: ErrorCode
  message?: string
  extra?: Record<string, any>
}

export const getErrorConfig = (error: ErrorInput) => {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return {
        code: error.code,
        message: error.message,
        displayMessage: '網路錯誤，請稍後再試。',
      }
    case 'API_RESPONSE_VALIDATION_ERROR':
      return {
        code: error.code,
        message: error.message,
        displayMessage: '伺服器回應格式錯誤，請聯繫客服。',
      }
    case 'API_REQUEST_VALIDATION_ERROR':
      return {
        code: error.code,
        message: error.message,
        displayMessage: '伺服器請求格式錯誤，請聯繫客服。',
      }
    case 'VALIDATION_ERROR':
      return {
        code: error.code,
        message: error.message,
        displayMessage: '驗證錯誤，請檢查輸入內容。',
      }
    case 'INTERNAL_SERVER_ERROR':
      return {
        code: error.code,
        message: error.message,
        displayMessage: '伺服器內部錯誤，請稍後再試。',
      }
    case 'UNKNOWN_ERROR':
      return {
        code: error.code,
        message: error.message,
        displayMessage: '發生未知錯誤。',
      }
    default:
      return {
        code: error.code,
        message: error.message,
        displayMessage: '發生未知錯誤。',
      }
  }
}
