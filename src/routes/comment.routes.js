const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const authMiddleware = require("../middlewares/auth.middleware");

router.get(
  "/getAllByPost/:type/:id",
  authMiddleware,
  CommentController.getAllCommentsByPost
);
router.post("/create", authMiddleware, CommentController.createComment);
router.put("/edit/:id", authMiddleware, CommentController.editComment);
router.delete("/delete/:id", authMiddleware, CommentController.deleteComment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Các API quản lý bình luận
 */

/**
 * @swagger
 * /api/comments/getAllByPost/{type}/{id}:
 *   get:
 *     summary: Lấy danh sách tất cả bình luận
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Loại nguồn gốc bình luận ("post" hoặc "shared")
 *         schema:
 *           type: string
 *           enum: [post, shared]
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bài đăng hoặc bài chia sẻ
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Danh sách bình luận
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   post_id:
 *                     type: string
 *                     format: uuid
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                   react_count:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   parent_comment:
 *                     type: string
 *                     format: uuid
 *                   username_parent:
 *                     type: string
 *                   root_comment:
 *                     type: string
 *                     format: uuid
 *                   username_root:
 *                     type: string
 *                   author_name:
 *                     type: string
 *                   author_image:
 *                     type: string
 *                   created_date:
 *                     type: string
 *                     format: date-time
 */

/**
 * @swagger
 * /api/comments/create:
 *   post:
 *     summary: Tạo bình luận\ mới
 *     tags: [Comments]
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
 *               react_count:
 *                 type: integer
 *               content:
 *                 type: string
 *               parent_comment:
 *                 type: string
 *                 format: uuid
 *               root_comment:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Đã tạo bình luận thành công
 */

/**
 * @swagger
 * /api/comments/edit/{id}:
 *   put:
 *     summary: Chỉnh sửa bình luận mới
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bình luận
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               react_count:
 *                 type: integer
 *               content:
 *                 type: string
 *               parent_comment:
 *                 type: string
 *                 format: uuid
 *               root_comment:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Đã chỉnh sửa bình luận thành công
 */

/**
 * @swagger
 * /api/comments/delete/{id}:
 *   delete:
 *     summary: Xóa bình luận\ mới
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bình luận
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Đã xóa bình luận thành công
 */
