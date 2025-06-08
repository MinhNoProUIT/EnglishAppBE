const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/auth.middleware");
const checkPermission = require("../middlewares/checkPermission");
const upload = require("../middlewares/upload.middleware");

router.get("/GetAll", authMiddleware, UserController.getUsers);
router.get("/getById", authMiddleware, UserController.getById);
router.get(
  "/get-recommend",
  authMiddleware,
  UserController.getAllUserRecommend
);
router.get("/getAll-post", UserController.getAllUsersInPost);
router.get("/search", UserController.filterUsersInPost);
router.post("/Create", UserController.createUser);
router.get("/getTopFive", UserController.getTopFiveUserInPost);
router.put(
  "/update/:id",
  authMiddleware,
  upload.single("image"),
  UserController.updateUser
);
router.put("/lock/:id", UserController.blockUser);
router.delete("/remove/:id", UserController.removeUser);
router.get("/quarter-stats", UserController.getQuarterlyUserStats);
router.get("/attendance-streak", UserController.getLongestAndShortestStreak);
router.get("/top-learning", UserController.getTopFiveLearning);
router.get("/top-topic", UserController.getTopLearnedTopics);
router.get("/learning", UserController.getLearningList);
router.put("/updateToPremium", authMiddleware, UserController.upgradeToPremium);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Các API quản lý người dùng
 */

/**
 * @swagger
 * /api/users/quarter-stats:
 *   get:
 *     summary: Lấy tổng số người dùng trong quý hiện tại và phần trăm tăng/giảm so với quý trước
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Thống kê người dùng theo quý
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentQuarterCount:
 *                   type: integer
 *                   description: Tổng số người dùng trong quý hiện tại
 *                   example: 120
 *                 changePercent:
 *                   type: number
 *                   format: float
 *                   description: Phần trăm tăng/giảm so với quý trước (%)
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

/**
 * @swagger
 * /api/users/get-recommend:
 *   get:
 *     summary: Lấy danh sách người dùng được hệ thống gợi ý (recommendation)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách người dùng được gợi ý
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Không có quyền truy cập (Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Lỗi hệ thống
 */

/**
 * @swagger
 * /api/users/GetAll:
 *    get:
 *      summary: "Lấy danh sách người dùng với các tham số tìm kiếm, phân trang và sắp xếp"
 *      description: "Truy vấn người dùng từ cơ sở dữ liệu với khả năng lọc, phân trang, và sắp xếp."
 *      tags: [Users]
 *      parameters:
 *        - in: query
 *          name: search
 *          description: "Từ khóa tìm kiếm cho username và email"
 *          required: false
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          description: "Trang hiện tại (mặc định là 1)"
 *          required: false
 *          schema:
 *            type: integer
 *            default: 1
 *        - in: query
 *          name: rowsPerPage
 *          description: "Số dòng mỗi trang (mặc định là 10)"
 *          required: false
 *          schema:
 *            type: integer
 *            default: 10
 *        - in: query
 *          name: sortBy
 *          description: "Trường để sắp xếp (mặc định là id)"
 *          required: false
 *          schema:
 *            type: string
 *            default: "id"
 *        - in: query
 *          name: sortOrder
 *          description: "Chiều sắp xếp, có thể là ASC hoặc DESC (mặc định là ASC)"
 *          required: false
 *          schema:
 *            type: string
 *            default: "ASC"
 *      responses:
 *        '200':
 *          description: "Danh sách người dùng đã được lọc, phân trang và sắp xếp"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  users:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/User'
 *                  total:
 *                    type: integer
 *                    description: "Tổng số người dùng thỏa mãn điều kiện tìm kiếm"
 *        '500':
 *          description: "Internal Server Error"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    example: "Internal Server Error"
 */

/**
 * @swagger
 * /api/users/learning:
 *   get:
 *     summary: Lấy danh sách học tập người dùng
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: search
 *         description: "Từ khóa tìm kiếm cho username và email"
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: "Trang hiện tại (mặc định là 1)"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: rowsPerPage
 *         description: "Số dòng mỗi trang (mặc định là 10)"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         description: "Trường để sắp xếp (mặc định là id)"
 *         required: false
 *         schema:
 *           type: string
 *           default: fullname
 *       - in: query
 *         name: sortOrder
 *         description: "Chiều sắp xếp, có thể là ASC hoặc DESC (mặc định là ASC)"
 *         required: false
 *         schema:
 *           type: string
 *           default: ASC
 *     responses:
 *       200:
 *         description: Danh sách người dùng và thống kê học tập
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fullname:
 *                     type: string
 *                     example: Nguyễn Văn A
 *                   chuoi:
 *                     type: integer
 *                     example: 15
 *                   tu:
 *                     type: integer
 *                     example: 520
 *                   chude:
 *                     type: integer
 *                     example: 25
 *       500:
 *         description: Lỗi server
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
 *  /api/users/getById:
 *    get:
 *      summary: "Lấy thông tin người dùng theo ID"
 *      description: "Truy vấn người dùng từ cơ sở dữ liệu theo ID (UUID)"
 *      tags: [Users]
 *      responses:
 *        '200':
 *          description: "Thông tin người dùng thành công"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        '404':
 *          description: "Không tìm thấy người dùng với ID này"
 *        '500':
 *          description: "Lỗi máy chủ nội bộ"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: "Tên người dùng"
 *         phonenumber:
 *           type: string
 *           description: "Số điện thoại người dùng"
 *         birthday:
 *           type: string
 *           format: date-time
 *           description: "Ngày sinh người dùng"
 *         gender:
 *           type: string
 *           description: "Giới tính người dùng"
 *         fullname:
 *           type: string
 *           description: "Họ và tên người dùng"
 *         address:
 *           type: string
 *           description: "Địa chỉ người dùng"
 *         image_url:
 *           type: string
 *           description: "URL hình ảnh người dùng"
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
 *               phonenumber:
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
 *               image_url:
 *                 type: string
 *                 format: binary   # Định nghĩa file ảnh
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

/**
 * @swagger
 *  /api/users/attendance-streak:
 *    get:
 *      summary: "Lấy người giữ chuỗi học lâu nhất và thấp nhất"
 *      description: "Truy vấn người giữ chuỗi học lâu nhất và thấp nhất từ bảng attendance"
 *      tags: [Users]
 *      responses:
 *        '200':
 *          description: "Danh sách người dùng với chuỗi học lâu nhất và thấp nhất"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  longestFullname:
 *                    type: string
 *                    description: "Tên người dùng có chuỗi học lâu nhất"
 *                  longestStreak:
 *                    type: integer
 *                    description: "Chuỗi học lâu nhất"
 *                  shortestFullname:
 *                    type: string
 *                    description: "Tên người dùng có chuỗi học ngắn nhất"
 *                  shortestStreak:
 *                    type: integer
 *                    description: "Chuỗi học ngắn nhất"
 *        '404':
 *          description: "Không tìm thấy bản ghi tham gia học"
 *        '500':
 *          description: "Lỗi máy chủ nội bộ"
 */
/**
 * @swagger
 * /api/users/top-learning:
 *   get:
 *     summary: Lấy top 5 người dùng học nhiều từ nhất
 *     description: Truy vấn số từ mỗi người học từ bảng user_progress, join với bảng users và trả về 5 người học nhiều nhất.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách top 5 người dùng học nhiều từ nhất
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fullname:
 *                     type: string
 *                     example: Nguyễn Văn A
 *                   wordCount:
 *                     type: integer
 *                     example: 42
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /api/users/top-topic:
 *   get:
 *     summary: Lấy 7 topic được học nhiều nhất
 *     description: Đếm số lượt truy cập vào mỗi topic trong study_access_topic và trả về 7 topic có số lượt học cao nhất.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách top 7 topic được học nhiều nhất
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Ngữ pháp cơ bản"
 *                   accessCount:
 *                     type: integer
 *                     example: 128
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

router.post("/", UserController.createUser);
