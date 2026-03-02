import { app } from '@/lib/hono'
import authMiddleware from '@/server/middlewares/auth.middleware'

import profileController from './profile.controller'

/**
 * @swagger
 * /api/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: 取得用戶資料
 *     description: 獲取當前登入用戶的個人資料
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 成功取得用戶資料
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: 用戶 ID
 *                       example: 1
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: 用戶信箱
 *                       example: "user@example.com"
 *                     username:
 *                       type: string
 *                       nullable: true
 *                       description: 用戶名稱
 *                       example: "johndoe"
 *                     picture:
 *                       type: string
 *                       nullable: true
 *                       description: 用戶頭像網址
 *                       example: "https://example.com/avatar.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: 帳號建立時間
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: 資料更新時間
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     metadata:
 *                       type: object
 *                       nullable: true
 *                       description: 額外用戶資料
 *                       example: null
 *       401:
 *         description: 未授權 - 需要登入
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "請先登入"
 */
app.get(
  '/profile',
  authMiddleware.requireLoggedIn,
  profileController.getProfile
)
