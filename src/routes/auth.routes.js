const AuthController = require("../controllers/AuthController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.put("/change-password", authMiddleware, AuthController.changePassword);
router.post("/logout", authMiddleware, AuthController.logout);
router.get("/me", authMiddleware, AuthController.me);
router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password/:token", AuthController.resetPassword);

module.exports = router;

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MyStrongPassword123
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: MyStrongPassword123
 *     responses:
 *       200:
 *         description: Đăng ký thành công, vui lòng xác minh email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully. Please verify your email.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Dữ liệu không hợp lệ (username/email/password sai)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Username already exists
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecret123
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng nhập thành công
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOi... (Firebase ID token)
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *       400:
 *         description: Lỗi đăng nhập (sai thông tin hoặc người dùng chưa xác minh)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email hoặc mật khẩu không đúng
 */
/**
 * @swagger
 * /auth/change-password:
 *   put:
 *     summary: "Đổi mật khẩu người dùng"
 *     description: "Thực hiện đổi mật khẩu của người dùng, yêu cầu mật khẩu cũ và mật khẩu mới."
 *     tags: [Auth]
 *     requestBody:
 *       description: "Thông tin để thay đổi mật khẩu"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: "Mật khẩu cũ của người dùng"
 *               newPassword:
 *                 type: string
 *                 description: "Mật khẩu mới của người dùng"
 *     responses:
 *       '200':
 *         description: "Mật khẩu đã được thay đổi thành công"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đổi mật khẩu thành công"
 *       '400':
 *         description: "Lỗi trong quá trình thay đổi mật khẩu"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Mật khẩu cũ không đúng"
 *       '500':
 *         description: "Lỗi máy chủ nội bộ"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Đã có lỗi xảy ra trong quá trình thay đổi mật khẩu"
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Đăng xuất người dùng
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *       401:
 *         description: Chưa xác thực người dùng
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Lấy thông tin người dùng hiện tại
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về thông tin người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 is_admin:
 *                   type: boolean
 *       401:
 *         description: Chưa xác thực người dùng
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: "Quên mật khẩu"
 *     description: "Gửi email yêu cầu thay đổi mật khẩu cho người dùng."
 *     tags: [Auth]
 *     requestBody:
 *       description: "Yêu cầu quên mật khẩu với email"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Địa chỉ email của người dùng"
 *                 example: "user@example.com"
 *     responses:
 *       '200':
 *         description: "Email đã được gửi thành công"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email đặt lại mật khẩu đã được gửi!"
 *       '400':
 *         description: "Lỗi khi gửi email (ví dụ: email không tồn tại)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email không tồn tại"
 *       '500':
 *         description: "Lỗi máy chủ"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Đã có lỗi xảy ra khi gửi email"
 */

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: "Đặt lại mật khẩu"
 *     description: "Xác nhận và thay đổi mật khẩu mới của người dùng bằng token xác minh."
 *     tags: [Auth]
 *     parameters:
 *       - name: "token"
 *         in: "path"
 *         required: true
 *         description: "Token xác minh từ email"
 *         schema:
 *           type: string
 *           example: "abcdefg1234567"
 *     requestBody:
 *       description: "Thông tin mật khẩu mới"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: "Mật khẩu mới của người dùng"
 *                 example: "newpassword123"
 *     responses:
 *       '200':
 *         description: "Mật khẩu đã được thay đổi thành công"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mật khẩu đã được thay đổi thành công!"
 *       '400':
 *         description: "Lỗi mật khẩu không hợp lệ hoặc token hết hạn"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token không hợp lệ hoặc mật khẩu mới không đáp ứng yêu cầu"
 *       '500':
 *         description: "Lỗi máy chủ"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Đã có lỗi xảy ra khi thay đổi mật khẩu"
 */
