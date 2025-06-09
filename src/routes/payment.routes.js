const express = require("express");
const router = express.Router();
const controller = require("../controllers/PaymentController");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: APIs for PayOS integration
 */

/**
 * @swagger
 * /api/payments/status/{orderCode}:
 *   get:
 *     summary: Kiểm tra trạng thái đơn thanh toán
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: orderCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã đơn thanh toán (orderCode)
 *     responses:
 *       200:
 *         description: Trạng thái đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: PAID
 */
router.get("/status/:orderCode", controller.getOrderStatus);

/**
 * @swagger
 * /api/payments/webhook:
 *   post:
 *     summary: Webhook từ PayOS (hệ thống gọi khi thanh toán thành công)
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderCode:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Webhook xử lý thành công
 */
router.post("/webhook", controller.handleWebhook);

/**
 * @swagger
 * /api/payments/getAll:
 *   get:
 *     summary: Lấy tất cả giao dịch
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Danh sách tất cả giao dịch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/getAll", controller.getAllPayment);

/**
 * @swagger
 * /api/payments/create:
 *   post:
 *     summary: Tạo đơn thanh toán mới
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - orderCode
 *               - description
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 100000
 *               orderCode:
 *                 type: string
 *                 example: "ORD12345"
 *               description:
 *                 type: string
 *                 example: "Thanh toán cho khóa học"
 *     responses:
 *       201:
 *         description: Thông tin đơn thanh toán
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment created successfully"
 *                 payment:
 *                   type: object
 *                   properties:
 *                     orderCode:
 *                       type: string
 *                       example: "ORD12345"
 *                     status:
 *                       type: string
 *                       example: "PAID"
 *                     amount:
 *                       type: integer
 *                       example: 100000
 */
router.post("/create", authMiddleware, controller.createPayment);

module.exports = router;
