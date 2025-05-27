const express = require("express");
const router = express.Router();
const CoinTransactionController = require("../controllers/CoinTransactionController");

/**
 * @swagger
 * tags:
 *   name: CoinTransactions
 *   description: API quản lý giao dịch xu
 */

/**
 * @swagger
 * /api/coin-transactions/getAll:
 *   get:
 *     summary: Lấy danh sách tất cả giao dịch xu
 *     tags: [CoinTransactions]
 *     responses:
 *       200:
 *         description: Danh sách các giao dịch xu
 */
router.get("/getAll", CoinTransactionController.getAllCoinTransactions);

/**
 * @swagger
 * /api/coin-transactions/summary/{user_id}:
 *   get:
 *     summary: Tổng coin nhận vào và tiêu trong tháng hiện tại của người dùng
 *     tags: [CoinTransactions]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Tổng số coin nhận và tiêu
 */
router.get("/summary/:user_id", CoinTransactionController.getMonthlySummary);

/**
 * @swagger
 * /api/coin-transactions/create:
 *   post:
 *     summary: Tạo mới giao dịch xu
 *     tags: [CoinTransactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               amount:
 *                 type: integer
 *               reason:
 *                 type: string
 *               reference_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               reference_table:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Giao dịch tạo thành công
 */
router.post("/create", CoinTransactionController.createCoinTransaction);

/**
 * @swagger
 * /api/coin-transactions/delete/{id}:
 *   delete:
 *     summary: Xóa giao dịch xu theo ID
 *     tags: [CoinTransactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID giao dịch cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/delete/:id", CoinTransactionController.deleteCoinTransaction);

/**
 * @swagger
 * /api/coin-transactions/export:
 *   get:
 *     summary: Xuất file CSV toàn bộ giao dịch xu
 *     tags: [CoinTransactions]
 *     responses:
 *       200:
 *         description: File CSV
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/export", CoinTransactionController.exportCoinTransactions);

module.exports = router;
