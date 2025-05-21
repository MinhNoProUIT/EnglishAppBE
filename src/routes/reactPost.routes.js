const express = require("express");
const router = express.Router();
const ReactPostController = require("../controllers/ReactPostController");

router.get("/getTotal/:id", ReactPostController.getTotalReactPost);
router.post("/create", ReactPostController.createReactPost);
router.delete("/delete/:id", ReactPostController.deleteReactPost);

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
 * /api/react-posts/delete/{id}:
 *   delete:
 *     summary: Xóa lượt react khỏi bài viết
 *     tags: [ReactPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của lượt react cần xóa
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Đã xóa react khỏi bài viết thành công
 */


