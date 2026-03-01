import { app } from '@/lib/hono'

import oauthController from './oauth.controller'

/**
 * @swagger
 * /api/oauth/google/login-url:
 *   get:
 *     tags:
 *       - OAuth
 *     summary: 取得 Google OAuth 登入網址
 *     description: 生成 Google OAuth 授權登入的網址，並設置 CSRF token 保護
 *     parameters:
 *       - in: query
 *         name: from
 *         required: false
 *         schema:
 *           type: string
 *           format: uri
 *           description: 登入成功後要重定向的網址
 *           example: "https://example.com/dashboard"
 *     responses:
 *       200:
 *         description: 成功生成 Google 登入網址
 *         headers:
 *           Set-Cookie:
 *             description: CSRF token cookie (csrf_token)
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     loginUrl:
 *                       type: string
 *                       format: uri
 *                       description: Google OAuth 授權登入網址
 *                       example: "https://accounts.google.com/oauth/v2/auth?client_id=xxx&redirect_uri=xxx&response_type=code&scope=openid%20profile%20email&state=xxx"
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
app.get('/oauth/google/login-url', oauthController.generateGoogleLoginUrl)

/**
 * @swagger
 * /api/oauth/google/callback:
 *   get:
 *     tags:
 *       - OAuth
 *     summary: 處理 Google OAuth 回調
 *     description: 處理 Google OAuth 授權回調，驗證授權碼並建立使用者 session
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *           description: Google OAuth 授權碼
 *           example: "4/0AdQt8qh..."
 *       - in: query
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *           description: Base64 編碼的狀態參數，包含 CSRF token 和重定向網址
 *           example: "eyJjc3JmVG9rZW4iOiJ4eHgiLCJmcm9tIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSJ9"
 *     responses:
 *       302:
 *         description: 登入成功，重定向到指定頁面
 *         headers:
 *           Set-Cookie:
 *             description: 使用者 session cookie
 *             schema:
 *               type: string
 *           Location:
 *             description: 重定向目標網址
 *             schema:
 *               type: string
 *               format: uri
 *       403:
 *         description: 認證失敗
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   enum: ["MISSING_GOOGLE_AUTH_CODE", "CSRF_ERROR"]
 *                   description: 錯誤代碼
 *                   example: "MISSING_GOOGLE_AUTH_CODE"
 *                 message:
 *                   type: string
 *                   description: 錯誤訊息
 *                   example: "Google 認證碼缺失"
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
app.get('/oauth/google/callback', oauthController.handleGoogleCallback)
