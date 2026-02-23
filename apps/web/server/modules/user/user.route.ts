import { app } from '@/lib/hono'
import userController from './user.controller'

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: 新增使用者
 *     description: 建立一個新的使用者帳號
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 使用者信箱
 *                 example: "user@example.com"
 *               username:
 *                 type: string
 *                 description: 使用者名稱 (可選)
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 minLength: 1
 *                 description: 使用者密碼
 *                 example: "password123"
 *               confirmPassword:
 *                 type: string
 *                 description: 確認密碼，必須與密碼相同
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: 使用者建立成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: 使用者 ID
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: 使用者信箱
 *                     username:
 *                       type: string
 *                       nullable: true
 *                       description: 使用者名稱
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: 建立時間
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: 更新時間
 *                     metadata:
 *                       type: object
 *                       nullable: true
 *                       description: 額外資料
 *       400:
 *         description: 輸入資料驗證錯誤
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
 *                   example: "信箱格式不正確"
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
 *                   example: "內部伺服器錯誤"
 */
app.post('/users', userController.insert)

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: 取得所有使用者
 *     description: 獲取系統中所有使用者的列表（無分頁功能）
 *     responses:
 *       200:
 *         description: 成功取得使用者列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: 使用者 ID
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: 使用者信箱
 *                       username:
 *                         type: string
 *                         nullable: true
 *                         description: 使用者名稱
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 建立時間
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: 更新時間
 *                       metadata:
 *                         type: object
 *                         nullable: true
 *                         description: 額外資料
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
 *                   example: "內部伺服器錯誤"
 */
app.get('/users', userController.findAll)
