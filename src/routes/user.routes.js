const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/GetAll", UserController.getUsers);
router.get("/getAll-post", UserController.getAllUsersInPost);
router.get("/search", UserController.filterUsersInPost);
router.post("/Create", UserController.createUser);
router.get("/getTopFive", UserController.getTopFiveUserInPost);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Các API quản lý người dùng
 */

/**
 * @swagger
 * /api/users/GetAll:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]    # Đặt tên nhóm ở đây
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */

/**
 * @swagger
 * /api/users/getTopFive:
 *   get:
 *     summary: Lấy top 5 người dùng trong post
 *     tags: [Users]    # Đặt tên nhóm ở đây
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */

/**
 * @swagger
 * /api/users/getAll-post:
 *   get:
 *     summary: Lấy danh sách người dùng trong bảng bài đăng (có phân trang)
 *     tags: [Users]
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
 *         description: Số lượng người dùng mỗi trang
 *     responses:
 *       200:
 *         description: Danh sách người dùng và thông tin phân trang
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
 *                       username:
 *                         type: string
 *                       image_url:
 *                         type: string
 *                       total_posts:
 *                         type: integer
 *                       total_react_count:
 *                         type: integer
 *                       total_share_count:
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
 * /api/users/search:
 *   get:
 *     summary: Tìm kiếm người dùng theo từ khóa (có phân trang)
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Từ khóa cần tìm trong tên người dùng
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
 *         description: Số lượng người dùng mỗi trang
 *       - in: query
 *         name: postRange
 *         schema:
 *           type: string
 *           enum: [all, lt10, from10to30, gt30]
 *           default: all
 *         description: Lọc người dùng theo tổng số bài viết (lt10 = <10, from10to30 = 10-30, gt30 = >30)
 *     responses:
 *       200:
 *         description: Danh sách người dùng phù hợp và thông tin phân trang
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
 *                       username:
 *                         type: string
 *                       image_url:
 *                         type: string
 *                       total_posts:
 *                         type: integer
 *                       total_react_count:
 *                         type: integer
 *                       total_shared_count:
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
 * /api/users/Create:
 *   post:
 *     summary: Tạo người dùng mới
 *     tags: [Users]    # Nhóm lại với "Users"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               passwordhash:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã tạo user thành công
 */

router.post("/", UserController.createUser);
