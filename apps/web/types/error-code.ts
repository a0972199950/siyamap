type ErrorCode =
  | 'NETWORK_ERROR' // 網路錯誤
  | 'API_RESPONSE_VALIDATION_ERROR' // API 回應格式錯誤
  | 'API_REQUEST_VALIDATION_ERROR' // API 請求格式錯誤
  | 'VALIDATION_ERROR' // 驗證錯誤
  | 'INTERNAL_SERVER_ERROR' // 內部伺服器錯誤

export default ErrorCode
