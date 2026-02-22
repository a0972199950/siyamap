import { NextRequest } from 'next/server'
import userController from '@/server/modules/user/user.controller'
// TODO: 改用一層 Hono 當作後端架構，因為 NEXTJS 沒有 middleware 的概念，所以無法在 route handler 之前做共用的前置處理（例如驗證、錯誤處理等），只能在每個 handler 裡面重複寫一次，這樣很麻煩也很容易出錯。Hono 是一個輕量級的 Node.js web 框架，支持 middleware，可以讓我們更方便地組織後端程式碼，並且可以在 route handler 之前做共用的前置處理。
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
export const POST = (req: NextRequest) => userController.insert(req)

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
export const GET = (req: NextRequest) => userController.findAll(req)
