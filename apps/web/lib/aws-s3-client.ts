import { S3Client } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION_S3_IMAGE_UPLOAD,

  // 在本機開發時，SDK 會自動偵測環境變數中的 AWS_ACCESS_KEY_ID 和 AWS_SECRET_ACCESS_KEY
  // 並使用這些憑證來簽署請求。
  // 在 Lambda 內則不需要手動傳入 credentials，他是靠 Lambda 的 IAM Role 來取得暫時憑證的。
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  // },

  // AWS SDK v3 >= ~3.370 預設 requestChecksumCalculation: 'when_supported'，
  // 會在 pre-signed URL 中自動加入 x-amz-checksum-crc32，
  // 導致 S3 要求瀏覽器 PUT 時必須帶 CRC32 header，
  // 而瀏覽器 fetch 不會自動計算，造成 403。
  requestChecksumCalculation: 'WHEN_REQUIRED',
})

export default s3Client
