import { app } from '@/lib/hono'
import { bodyValidator } from '@/server/middlewares/validator.middleware'
import { LoginDto, SignupDto } from '@/types/dto'

import authController from './auth.controller'

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: 使用者註冊
 *     description: 建立新的使用者帳號並自動登入
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
 *         description: 註冊成功，使用者已建立並自動登入
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
 *                       example: 1
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: 使用者信箱
 *                       example: "user@example.com"
 *                     username:
 *                       type: string
 *                       nullable: true
 *                       description: 使用者名稱
 *                       example: "johndoe"
 *                     picture:
 *                       type: string
 *                       nullable: true
 *                       description: 使用者頭像
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: 建立時間
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: 更新時間
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     metadata:
 *                       type: object
 *                       nullable: true
 *                       description: 額外資料
 *                       example: null
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
 *         description: 使用者已存在或伺服器內部錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "USER_EXISTS"
 *                 message:
 *                   type: string
 *                   example: "使用者已存在"
 */
app.post('/auth/signup', bodyValidator.json(SignupDto), authController.signup)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: 使用者登入
 *     description: 使用信箱和密碼進行使用者身份驗證
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 使用者信箱
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 minLength: 1
 *                 description: 使用者密碼
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 登入成功
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
 *                       example: 1
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: 使用者信箱
 *                       example: "user@example.com"
 *                     username:
 *                       type: string
 *                       nullable: true
 *                       description: 使用者名稱
 *                       example: "johndoe"
 *                     picture:
 *                       type: string
 *                       nullable: true
 *                       description: 使用者頭像
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: 建立時間
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: 更新時間
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     metadata:
 *                       type: object
 *                       nullable: true
 *                       description: 額外資料
 *                       example: null
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
 *       401:
 *         description: 身份驗證失敗
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   enum: ["UNAUTHORIZED", "USER_FROM_OAUTH"]
 *                   example: "UNAUTHORIZED"
 *                 message:
 *                   type: string
 *                   example: "密碼錯誤"
 *       404:
 *         description: 使用者不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "USER_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "使用者不存在"
 */
app.post('/auth/login', bodyValidator.json(LoginDto), authController.login)

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: 使用者登出
 *     description: 清除使用者的登入 session，登出系統
 *     responses:
 *       200:
 *         description: 登出成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: boolean
 *                   description: 登出操作結果
 *                   example: true
 */
app.get('/auth/logout', authController.logout)
