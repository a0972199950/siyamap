import { app } from '@/lib/hono'
import { bodyValidator } from '@/server/middlewares/validator.middleware'
import { CreateFileDto } from '@/types/dto'

import fileController from './file.controller'

/**
 * @swagger
 * /api/files:
 *   post:
 *     summary: 建立檔案並生成上傳 URL
 *     description: 在資料庫中建立檔案記錄並使用 AWS S3 生成預簽名 URL，允許客戶端直接上傳檔案到 S3
 *     tags:
 *       - Files
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileType
 *             properties:
 *               fileType:
 *                 type: string
 *                 description: 檔案的 MIME 類型
 *                 example: "image/jpeg"
 *     responses:
 *       200:
 *         description: 成功建立檔案並生成上傳 URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     file:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           description: 檔案 ID
 *                           example: 1
 *                         url:
 *                           type: string
 *                           format: uri
 *                           description: 檔案的公開存取 URL
 *                           example: "https://cdn.siyamap.com/550e8400-e29b-41d4-a716-446655440000.jpeg"
 *                         fileName:
 *                           type: string
 *                           description: 生成的檔案名稱
 *                           example: "550e8400-e29b-41d4-a716-446655440000.jpeg"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: 建立時間
 *                           example: "2024-01-01T00:00:00.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           description: 更新時間
 *                           example: "2024-01-01T00:00:00.000Z"
 *                     uploadUrl:
 *                       type: string
 *                       format: uri
 *                       description: AWS S3 預簽名上傳 URL (有效期 1 小時)
 *                       example: "https://siyamap-images.s3.amazonaws.com/550e8400-e29b-41d4-a716-446655440000.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=..."
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
 *                   example: "Required at \"fileType\""
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
 *                   example: "Failed to create file or generate upload URL"
 */
app.post('/files', bodyValidator.json(CreateFileDto), fileController.upload)
