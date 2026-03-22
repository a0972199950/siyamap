import { app } from '@/lib/hono'
import authMiddleware from '@/server/middlewares/auth.middleware'
import { reqValidator } from '@/server/middlewares/validator.middleware'
import {
  CreateSeatMapDto,
  FindSeatMapDto,
  FindVenusForSeatMapDto,
  UpdateSeatMapDto,
} from '@/types/dto'

import seatMapController from './seat-map.controller'

/**
 * @swagger
 * /api/venus/{venusId}/seat-map:
 *   post:
 *     tags:
 *       - SeatMaps
 *     summary: 新增座位圖
 *     description: 在指定場館下建立一個新的座位圖（需要管理員權限）
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venusId
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
 *             required:
 *               - mapSvg
 *               - concertName
 *             properties:
 *               mapSvg:
 *                 type: string
 *                 description: 座位圖 SVG 內容
 *                 example: "<svg>...</svg>"
 *               name:
 *                 type: string
 *                 nullable: true
 *                 description: 座位圖名稱（可選）
 *                 example: "一樓座位圖"
 *               concertName:
 *                 type: string
 *                 description: 演唱會名稱
 *                 example: "2024 五月天演唱會"
 *     responses:
 *       200:
 *         description: 座位圖建立成功
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
 *                       description: 座位圖 ID
 *                       example: "01961a3e-0e5b-7000-8000-000000000001"
 *                     venueId:
 *                       type: string
 *                       format: uuid
 *                       description: 場館 ID
 *                       example: "01961a3e-0e5b-7000-8000-000000000000"
 *                     mapSvg:
 *                       type: string
 *                       description: 座位圖 SVG 內容
 *                       example: "<svg>...</svg>"
 *                     name:
 *                       type: string
 *                       nullable: true
 *                       description: 座位圖名稱
 *                       example: "一樓座位圖"
 *                     concertName:
 *                       type: string
 *                       description: 演唱會名稱
 *                       example: "2024 五月天演唱會"
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
app.post(
  '/venus/:venusId/seat-map',
  authMiddleware.requireAdmin,
  reqValidator.params(FindVenusForSeatMapDto),
  reqValidator.json(CreateSeatMapDto),
  seatMapController.create
)

/**
 * @swagger
 * /api/seat-map/{id}:
 *   put:
 *     tags:
 *       - SeatMaps
 *     summary: 更新座位圖
 *     description: 根據 ID 更新座位圖資料（需要管理員權限）
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 座位圖 ID
 *         example: "01961a3e-0e5b-7000-8000-000000000001"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mapSvg:
 *                 type: string
 *                 description: 座位圖 SVG 內容（可選）
 *                 example: "<svg>...</svg>"
 *               name:
 *                 type: string
 *                 nullable: true
 *                 description: 座位圖名稱（可選）
 *                 example: "二樓座位圖"
 *               concertName:
 *                 type: string
 *                 description: 演唱會名稱（可選）
 *                 example: "2024 五月天演唱會"
 *     responses:
 *       200:
 *         description: 座位圖更新成功
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
 *                       description: 座位圖 ID
 *                       example: "01961a3e-0e5b-7000-8000-000000000001"
 *                     venueId:
 *                       type: string
 *                       format: uuid
 *                       description: 場館 ID
 *                       example: "01961a3e-0e5b-7000-8000-000000000000"
 *                     mapSvg:
 *                       type: string
 *                       description: 座位圖 SVG 內容
 *                       example: "<svg>...</svg>"
 *                     name:
 *                       type: string
 *                       nullable: true
 *                       description: 座位圖名稱
 *                       example: "二樓座位圖"
 *                     concertName:
 *                       type: string
 *                       description: 演唱會名稱
 *                       example: "2024 五月天演唱會"
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
 *       404:
 *         description: 座位圖不存在
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
 *                   example: "座位圖不存在"
 */
app.put(
  '/seat-map/:id',
  authMiddleware.requireAdmin,
  reqValidator.params(FindSeatMapDto),
  reqValidator.json(UpdateSeatMapDto),
  seatMapController.update
)

/**
 * @swagger
 * /api/seat-map/{id}:
 *   get:
 *     tags:
 *       - SeatMaps
 *     summary: 取得單一座位圖
 *     description: 根據 ID 取得座位圖資料
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 座位圖 ID
 *         example: "01961a3e-0e5b-7000-8000-000000000001"
 *     responses:
 *       200:
 *         description: 成功取得座位圖資料
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
 *                       description: 座位圖 ID
 *                       example: "01961a3e-0e5b-7000-8000-000000000001"
 *                     venueId:
 *                       type: string
 *                       format: uuid
 *                       description: 場館 ID
 *                       example: "01961a3e-0e5b-7000-8000-000000000000"
 *                     mapSvg:
 *                       type: string
 *                       description: 座位圖 SVG 內容
 *                       example: "<svg>...</svg>"
 *                     name:
 *                       type: string
 *                       nullable: true
 *                       description: 座位圖名稱
 *                       example: "一樓座位圖"
 *                     concertName:
 *                       type: string
 *                       description: 演唱會名稱
 *                       example: "2024 五月天演唱會"
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
 *         description: 座位圖不存在
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
 *                   example: "座位圖不存在"
 */
app.get(
  '/seat-map/:id',
  reqValidator.params(FindSeatMapDto),
  seatMapController.findOne
)
