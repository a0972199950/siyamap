import { NextRequest, NextResponse } from 'next/server'

/**
 * @swagger
 * /api/health-check:
 *   get:
 *     tags:
 *       - System
 *     summary: 系統健康檢查
 *     description: 檢查 API 服務是否正常運作
 *     responses:
 *       200:
 *         description: 服務正常
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: 健康檢查結果
 *                   example: true
 */
export const GET = async (req: NextRequest) => {
  return NextResponse.json({ result: true })
}
