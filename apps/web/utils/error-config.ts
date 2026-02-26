import { ApiErrorResponse } from '@/types'

export const getErrorConfig = (error: ApiErrorResponse) => {
  const clientConfig = {
    displayMessage: '',
  }

  switch (error.code) {
    case 'NETWORK_ERROR':
      clientConfig.displayMessage = '網路錯誤，請稍後再試。'
      break
    case 'API_RESPONSE_VALIDATION_ERROR':
      clientConfig.displayMessage = '伺服器回應格式錯誤，請聯繫客服。'
      break
    case 'API_REQUEST_VALIDATION_ERROR':
      clientConfig.displayMessage = '伺服器請求格式錯誤，請聯繫客服。'
      break
    case 'VALIDATION_ERROR':
      clientConfig.displayMessage = '驗證錯誤，請檢查輸入內容。'
      break
    case 'INTERNAL_SERVER_ERROR':
      clientConfig.displayMessage = '伺服器內部錯誤，請稍後再試。'
      break
    case 'UNKNOWN_ERROR':
      clientConfig.displayMessage = '發生未知錯誤。'
      break
    default:
      clientConfig.displayMessage = '發生未知錯誤。'
      break
  }

  return {
    ...error,
    ...clientConfig,
  }
}
