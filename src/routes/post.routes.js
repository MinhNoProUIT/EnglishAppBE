const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const PostController = require("../controllers/PostController");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAll", authMiddleware, PostController.getAllPosts);
router.get("/getTotal", authMiddleware, PostController.getTotalPosts);
router.post("/create", authMiddleware, upload.single('image'), PostController.createPost);
router.get("/getData", authMiddleware, PostController.getPostChartData);
router.get("/month-stats", authMiddleware, PostController.getMonthlyPostStats);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Các API quản lý bài đăng
 */

/**
 * @swagger
 * /api/posts/getAll:
 *   get:
 *     summary: Lấy danh sách bài đăng (có phân trang)
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Số lượng bài đăng mỗi trang
 *     responses:
 *       200:
 *         description: Danh sách bài đăng và thông tin phân trang
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
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                       content:
 *                         type: string
 *                       author_name:
 *                         type: string
 *                       author_image_url:
 *                         type: string
 *                       created_date:
 *                         type: string
 *                         format: date-time
 *                       react_count:
 *                         type: integer
 *                       comment_count:
 *                         type: integer
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */

/**
 * @swagger
 * /api/posts/getTotal:
 *   get:
 *     summary: Lấy tổng danh sách bài đăng
 *     tags: [Posts]    # Đặt tên nhóm ở đây
 *     responses:
 *       200:
 *         description: Tổng bài đăng
 */

/**
 * @swagger
 * /api/posts/create:
 *   post:
 *     summary: Tạo bài đăng mới
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               react_count:
 *                 type: integer
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary   # Định nghĩa file ảnh
 *               shared_user_id_count:
 *                 type: integer
 *               comment_count:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Đã tạo Post thành công
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

/**
 * @swagger
 * /api/posts/month-stats:
 *   get:
 *     summary: Lấy tổng số bài đăng trong quý hiện tại và phần trăm tăng/giảm so với quý trước
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Thống kê bài đăng theo tháng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentMonthCount:
 *                   type: integer
 *                   description: Tổng số bài đăng trong tháng hiện tại
 *                   example: 120
 *                 changePercent:
 *                   type: number
 *                   format: float
 *                   description: Phần trăm tăng/giảm so với tháng trước (%)
 *                   example: 15.5
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
