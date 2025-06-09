const express = require("express");
const router = express.Router();
const ReactPostController = require("../controllers/ReactPostController");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getTotal/:id", authMiddleware, ReactPostController.getTotalReactPost);
router.post("/create", authMiddleware, ReactPostController.createReactPost);
router.delete("/delete/:user_id/:post_id", authMiddleware, ReactPostController.deleteReactPost);
router.get("/check-like/:user_id/:post_id", authMiddleware, ReactPostController.checkLikePost);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ReactPosts
 *   description: Các API quản lý lượt tương tác (react) cho bài viết
 */

/**
 * @swagger
 * /api/react-posts/getTotal/{id}:
 *   get:
 *     summary: Lấy tổng số lượt react cho bài viết
 *     tags: [ReactPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bài đăng
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tổng số lượt react của bài viết
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 react_count:
 *                   type: integer
 */

/**
 * @swagger
 * /api/react-posts/check-like/{user_id}/{post_id}:
 *   get:
 *     summary: Kiểm tra like bài đăng
 *     tags: [ReactPosts]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID của bài đăng
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tổng số lượt react của bài viết
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 react_count:
 *                   type: integer
 */

/**
 * @swagger
 * /api/react-posts/create:
 *   post:
 *     summary: Thêm lượt react cho bài viết
 *     tags: [ReactPosts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_id:
 *                 type: string
 *                 format: uuid
 *               user_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Đã thêm react cho bài viết thành công
 */

/**
 * @swagger
 * /api/react-posts/delete/{user_id}/{post_id}:
 *   delete:
 *     summary: Xóa lượt react khỏi bài viết
 *     tags: [ReactPosts]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID của bài đăng
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Đã xóa react khỏi bài viết thành công
 */
