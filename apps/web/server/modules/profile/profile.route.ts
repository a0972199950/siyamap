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
 *                 data:
 *                   $ref: '#/components/schemas/User'
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
