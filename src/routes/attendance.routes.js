const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Quản lý điểm danh
 */

/**
/**
 * @swagger
 * /api/attendance/getAllUser:
 *   get:
 *     summary: Lấy tất cả điểm danh của user theo user_id truyền vào path
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: Danh sách điểm danh của user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/getAllUser",
  authMiddleware,
  AttendanceController.getAllUserAttendance
);

/**
 * @swagger
 * /api/attendance/getAll:
 *   get:
 *     summary: Lấy tất cả điểm danh
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: Danh sách tất cả điểm danh
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/getAll", AttendanceController.getAllAttendance);

/**
 * @swagger
 * /api/attendance/create:
 *   post:
 *     summary: Tạo điểm danh mới
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID của user điểm danh
 *     responses:
 *       201:
 *         description: Tạo điểm danh thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/create", AttendanceController.createAttendance);

/**
 * @swagger
 * /api/attendance/delete/{id}:
 *   delete:
 *     summary: Xóa điểm danh theo ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID của điểm danh cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/delete/:id", AttendanceController.deleteAttendance);

/**
 * @swagger
 * /api/attendance/getMonthlyAttendanceSummary:
 *   get:
 *     summary: Lấy tổng điểm danh tháng hiện tại và phần trăm tăng giảm so với tháng trước
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: Thông tin tổng hợp điểm danh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentMonthCount:
 *                   type: integer
 *                 percentChange:
 *                   type: number
 *                   format: float
 */
router.get(
  "/getMonthlyAttendanceSummary",
  AttendanceController.getMonthlyAttendanceSummary
);

module.exports = router;
