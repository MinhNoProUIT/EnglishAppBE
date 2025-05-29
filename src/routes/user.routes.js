const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/auth.middleware");
const checkPermission = require("../middlewares/checkPermission");

router.get(
  "/GetAll",
  authMiddleware,
  checkPermission("user"),
  UserController.getUsers
);
router.get("/getAll-post", UserController.getAllUsersInPost);
router.get("/search", UserController.filterUsersInPost);
router.post("/Create", UserController.createUser);
router.get("/getTopFive", UserController.getTopFiveUserInPost);
router.put("/update/:id", UserController.updateUser);
router.put("/lock/:id", UserController.blockUser);
router.delete("/remove/:id", UserController.removeUser);

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
 * /api/users/create:
 *   post:
 *     summary: Tạo người dùng mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               passwordhash:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: boolean
 *               fullname:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phonenumber:
 *                 type: string
 *                 maxLength: 15
 *               image_url:
 *                 type: string
 *                 format: uri
 *               isadmin:
 *                 type: boolean
 *                 default: false
 *               balance:
 *                 type: integer
 *                 default: 0
 *             required:
 *               - username
 *               - passwordhash
 *               - email
 *     responses:
 *       201:
 *         description: Đã tạo user thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 */

/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần cập nhật
 *         schema:
 *           type: string
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
 *               phonenumber:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               fullname:
 *                 type: string
 *               address:
 *                 type: string
 *               image_url:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/UserUpdateVModel'
 *       400:
 *         description: Không tìm thấy người dùng hoặc lỗi dữ liệu
 */

/**
 * @swagger
 * /api/users/lock/{id}:
 *   put:
 *     summary: Khóa tài khoản người dùng (block user)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần khóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Người dùng đã được khóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user blocked successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     is_block:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Lỗi hoặc không tìm thấy người dùng
 */

/**
 * @swagger
 * /api/users/remove/{id}:
 *   put:
 *     summary: xóa tài khoản người dùng (remove user)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Người dùng đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user removed successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     isactive:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Lỗi hoặc không tìm thấy người dùng
 */

router.post("/", UserController.createUser);
