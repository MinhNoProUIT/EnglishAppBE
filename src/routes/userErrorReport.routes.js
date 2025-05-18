const express = require("express");
const UserErrorReportController = require("../controllers/UserErrorReport");
const router = express.Router();

router.get("/getAll", UserErrorReportController.getAllUserErrorReports);
router.post("/create", UserErrorReportController.createUserErrorReport);
router.patch("/reject/:id", UserErrorReportController.rejectUserErrorReport);
router.patch("/accept/:id", UserErrorReportController.acceptUserErrorReport);

module.exports = router;

/**
 * @swagger
 * /api/user-error-reports/getAll:
 *   get:
 *     summary: Lấy toàn bộ danh sách báo cáo bài đăng của người dùng
 *     tags: [UserErrorReports]
 *     responses:
 *       200:
 *         description: Danh sách tất cả báo cáo bài đăng của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                   post_id:
 *                     type: string
 *                     format: uuid
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   created_date:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 */

/**
 * @swagger
 * /api/user-error-reports/create:
 *   post:
 *     summary: Tạo bài báo cáo người dùng về bài đăng
 *     tags: [UserErrorReports]   
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
 *               post_id:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã tạo UserErrorReport thành công
 */

/**
 * @swagger
 * /api/user-error-reports/reject/{id}:
 *   patch:
 *     summary: Từ chối báo cáo lỗi người dùng
 *     tags: [UserErrorReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của báo cáo lỗi cần từ chối
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Đã từ chối báo cáo lỗi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Rejected
 *       400:
 *         description: Lỗi khi từ chối báo cáo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Không tìm thấy báo cáo lỗi với id đã cung cấp
 */

/**
 * @swagger
 * /api/user-error-reports/accept/{id}:
 *   patch:
 *     summary: Chấp nhận báo cáo lỗi người dùng
 *     tags: [UserErrorReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của báo cáo lỗi cần chấp nhận
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Đã chấp nhận báo cáo lỗi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Rejected
 *       400:
 *         description: Lỗi khi chấp nhận báo cáo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Không tìm thấy báo cáo lỗi với id đã cung cấp
 */

