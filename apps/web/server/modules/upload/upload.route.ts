import { app } from '@/lib/hono'
import { bodyValidator } from '@/server/middlewares/validator.middleware'
import uploadController from './upload.controller'
import { CreateUploadUrlDto } from '@/types/dto'

/**
 * @swagger
 * /api/upload/url:
 *   post:
 *     summary: 建立檔案上傳的預簽名 URL
 *     description: 使用 AWS S3 生成一個預簽名 URL，允許客戶端直接上傳檔案到 S3
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileName
 *               - fileType
 *             properties:
 *               fileType:
 *                 type: string
 *                 description: 檔案的 MIME 類型
 *                 example: "image/jpeg"
 *     responses:
 *       200:
 *         description: 成功生成上傳 URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   format: uri
 *                   description: AWS S3 預簽名上傳 URL (有效期 1 小時)
 *                   example: "https://siyamap-images.s3.amazonaws.com/profile-image.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=..."
 *
 *       400:
 *         description: 請求參數驗證錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "API_REQUEST_VALIDATION_ERROR"
 *                 message:
 *                   type: string
 *                   description: Zod 驗證錯誤訊息
 *                   example: "Required at \"fileName\"; Required at \"fileType\""
 *       500:
 *         description: 伺服器內部錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "INTERNAL_SERVER_ERROR"
 *                 message:
 *                   type: string
 *                   description: 錯誤訊息
 *                   example: "無法生成上傳 URL"
 */
app.post(
  '/upload/url',
  bodyValidator.json(CreateUploadUrlDto),
  uploadController.upload
)
