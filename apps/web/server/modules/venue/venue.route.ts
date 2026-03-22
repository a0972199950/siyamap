import { app } from '@/lib/hono'
import authMiddleware from '@/server/middlewares/auth.middleware'
import { reqValidator } from '@/server/middlewares/validator.middleware'
import { FindVenueDto,InsertVenueDto, UpdateVenueDto } from '@/types/dto'

import venueController from './venue.controller'


/**
 * @swagger
 * /api/venues:
 *   post:
 *     tags:
 *       - Venues
 *     summary: 新增場館
 *     description: 建立一個新的場館（需要管理員權限）
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: 場館名稱
 *                 example: "台北小巨蛋"
 *     responses:
 *       201:
 *         description: 場館建立成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: 場館 ID
 *                       example: "01961a3e-0e5b-7000-8000-000000000000"
 *                     name:
 *                       type: string
 *                       description: 場館名稱
 *                       example: "台北小巨蛋"
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
 *       400:
 *         description: 場館已存在或輸入資料驗證錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "VENUE_EXISTS"
 *                 message:
 *                   type: string
 *                   example: "場館已存在"
 *       401:
 *         description: 未授權 - 需要管理員權限
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
app.post(
  '/venues',
  authMiddleware.requireAdmin,
  reqValidator.json(InsertVenueDto),
  venueController.insert
)

/**
 * @swagger
 * /api/venues/{id}:
 *   get:
 *     tags:
 *       - Venues
 *     summary: 取得單一場館
 *     description: 根據 ID 取得場館資料
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 場館 ID
 *         example: "01961a3e-0e5b-7000-8000-000000000000"
 *     responses:
 *       200:
 *         description: 成功取得場館資料
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: 場館 ID
 *                       example: "01961a3e-0e5b-7000-8000-000000000000"
 *                     name:
 *                       type: string
 *                       description: 場館名稱
 *                       example: "台北小巨蛋"
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
 *       404:
 *         description: 場館不存在
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "DATA_NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "場館不存在"
 */
app.get(
  '/venues/:id',
  reqValidator.params(FindVenueDto),
  venueController.findOne
)

/**
 * @swagger
 * /api/venues:
 *   get:
 *     tags:
 *       - Venues
 *     summary: 取得所有場館
 *     description: 獲取系統中所有場館的列表
 *     responses:
 *       200:
 *         description: 成功取得場館列表
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
 *                         type: string
 *                         format: uuid
 *                         description: 場館 ID
 *                         example: "01961a3e-0e5b-7000-8000-000000000000"
 *                       name:
 *                         type: string
 *                         description: 場館名稱
 *                         example: "台北小巨蛋"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 建立時間
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: 更新時間
 *                         example: "2024-01-01T00:00:00.000Z"
 */
app.get(
  '/venues',
  venueController.findAll
)

/**
 * @swagger
 * /api/venues/{id}:
 *   put:
 *     tags:
 *       - Venues
 *     summary: 更新場館
 *     description: 根據 ID 更新場館資料（需要管理員權限）
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 場館 ID
 *         example: "01961a3e-0e5b-7000-8000-000000000000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 場館名稱（可選）
 *                 example: "高雄巨蛋"
 *     responses:
 *       200:
 *         description: 場館更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: 場館 ID
 *                       example: "01961a3e-0e5b-7000-8000-000000000000"
 *                     name:
 *                       type: string
 *                       description: 場館名稱
 *                       example: "高雄巨蛋"
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
 *       401:
 *         description: 未授權 - 需要管理員權限
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
app.put(
  '/venues/:id',
  authMiddleware.requireAdmin,
  reqValidator.params(FindVenueDto),
  reqValidator.json(UpdateVenueDto),
  venueController.update
)

/**
 * @swagger
 * /api/venues/{id}:
 *   delete:
 *     tags:
 *       - Venues
 *     summary: 刪除場館
 *     description: 根據 ID 刪除場館（需要管理員權限）
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 場館 ID
 *         example: "01961a3e-0e5b-7000-8000-000000000000"
 *     responses:
 *       200:
 *         description: 場館刪除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: 刪除成功訊息
 *                   example: "場館已刪除"
 *       401:
 *         description: 未授權 - 需要管理員權限
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
app.delete(
  '/venues/:id',
  authMiddleware.requireAdmin,
  reqValidator.params(FindVenueDto),
  venueController.delete
)
