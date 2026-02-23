'use server'

export const fetchHeavyData = async () => {
  // 模擬從資料庫抓取 10,000 筆資料的 ID 或數值
  // 這裡不需要 setTimeout，因為我們要的是「結果」
  return Array.from({ length: 5000 }, (_, i) => i)
}
