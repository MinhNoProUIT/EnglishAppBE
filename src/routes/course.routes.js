const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");

router.get("/getAll", CourseController.getAllCourses);
router.get("/getTotal", CourseController.getTotalCourses);
router.post("/create", CourseController.createCourse);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Các API quản lý khóa học
 */

/**
 * @swagger
 * /api/courses/getAll:
 *   get:
 *     summary: Lấy danh sách tất cả khóa học
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Danh sách khóa học
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   topic_id:
 *                     type: string
 *                     format: uuid
 *                   level:
 *                     type: string
 *                   description:
 *                     type: string
 *                   image_url:
 *                     type: string
 *                   price:
 *                     type: integer    
 *                   created_date:
 *                     type: string
 *                     format: date-time
 */

/**
 * @swagger
 * /api/courses/getTotal:
 *   get:
 *     summary: Lấy tổng danh sách khóa học
 *     tags: [Courses]    # Đặt tên nhóm ở đây
 *     responses:
 *       200:
 *         description: Tổng khóa học
 */

/**
 * @swagger
 * /api/courses/create:
 *   post:
 *     summary: Tạo khóa học mới
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               topic_id:
 *                 type: string
 *                 format: uuid
 *               level:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Đã tạo khóa học thành công
 */

/**
 * @swagger
 * /api/posts/getData:
 *   get:
 *     summary: Lấy dữ liệu biểu đồ số lượng bài viết theo ngày
 *     tags: [Posts]
 *     description: Trả về số lượng bài viết theo từng ngày trong khoảng 7, 30 hoặc 90 ngày gần nhất, dùng cho biểu đồ thống kê.
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           enum: [7, 30, 90]
 *           default: 7
 *         required: false
 *         description: "Số ngày gần nhất để lấy dữ liệu (ví dụ: 7, 30, hoặc 90)."
 *     responses:
 *       200:
 *         description: Danh sách số bài viết mỗi ngày
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "12/05/2025"
 *                     description: Ngày đăng bài (định dạng dd/mm/yyyy)
 *                   count:
 *                     type: integer
 *                     example: 5
 *                     description: Số lượng bài viết trong ngày đó
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

