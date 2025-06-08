const express = require("express");
const router = express.Router();
const UserAbuseReportController = require("../controllers/UserAbuseReportController");

/**
 * @swagger
 * tags:
 *   name: UserAbuseReports
 *   description: API quản lý thống kê báo cáo lỗi
 */

/**
 * @swagger
 * /api/user-abuse-reports/getAll:
 *   get:
 *     summary: Lấy danh sách tất cả báo cáo lỗi
 *     tags: [UserAbuseReports]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Số trang (mặc định 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *           minimum: 1
 *         description: Số bản ghi trên mỗi trang (mặc định 5)
 *     responses:
 *       200:
 *         description: Danh sách các báo cáo lỗi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Success:
 *                   type: boolean
 *                   example: true
 *                 Data:
 *                   type: object
 *                   properties:
 *                     reports:
 *                       type: array
 *                       items:
 *                         type: object
 *                         # bạn có thể mô tả các trường của report ở đây
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 100
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 5
 *                 Message:
 *                   type: string
 *                   example: "Get Data Successful!"
 */

router.get("/getAll", UserAbuseReportController.getAllUserAbuseReport);

/**
 * @swagger
 * /api/user-abuse-reports/getMonthlyUserAbuseReportSummary:
 *   get:
 *     summary: Tổng report nhận vào trong tháng hiện tại của người dùng
 *     tags: [UserAbuseReports]
 *     responses:
 *       200:
 *         description: Tổng số report nhận
 */
router.get(
  "/getMonthlyUserAbuseReportSummary",
  UserAbuseReportController.getMonthlyUserAbuseReportSummary
);

/**
 * @swagger
 * /api/user-abuse-reports/create:
 *   post:
 *     summary: Tạo mới báo cáo lỗi
 *     tags: [UserAbuseReports]
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
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post("/create", UserAbuseReportController.createUserAbuseReport);

/**
 * @swagger
 * /api/user-abuse-reports/delete/{id}:
 *   delete:
 *     summary: Xóa báo cáo lỗi theo ID
 *     tags: [UserAbuseReports]
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
router.delete("/delete/:id", UserAbuseReportController.deleteUserAbuseReport);

/**
 * @swagger
 * /api/user-abuse-reports/export:
 *   get:
 *     summary: Xuất file CSV toàn bộ báo cáo lỗi
 *     tags: [UserAbuseReports]
 *     responses:
 *       200:
 *         description: File CSV
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/export", UserAbuseReportController.exportUserAbuseReport);

module.exports = router;
