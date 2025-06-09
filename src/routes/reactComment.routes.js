const express = require("express");
const router = express.Router();
const ReactCommentController = require("../controllers/ReactCommentController");
const authMiddleware = require("../middlewares/auth.middleware");

router.get(
  "/getAllByPost/:id",
  authMiddleware,
  ReactCommentController.getAllReactCommentsByPost
);
router.post(
  "/create",
  authMiddleware,
  ReactCommentController.createReactComment
);
router.delete(
  "/delete/:user_id/:comment_id",
  authMiddleware,
  ReactCommentController.deleteReactComment
);
router.get("/check-like/:user_id/:comment_id", authMiddleware, ReactCommentController.checkLikeComment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ReactComments
 *   description: Các API quản lý lượt tương tác (react) bình luận
 */

/**
 * @swagger
 * /api/react-comments/getAllByPost/{id}:
 *   get:
 *     summary: Lấy danh sách lượt tương tác bình luận theo bài viết
 *     tags: [ReactComments]
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
 *         description: Danh sách react theo bình luận
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   comment_id:
 *                     type: string
 *                     format: uuid
 *                   react_count:
 *                     type: integer
 */

/**
 * @swagger
 * /api/react-comments/check-like/{user_id}/{comment_id}:
 *   get:
 *     summary: Kiểm tra like bình luận
 *     tags: [ReactComments]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID của bình luận
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
 * /api/react-comments/create:
 *   post:
 *     summary: Thêm lượt react cho một bình luận
 *     tags: [ReactComments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_id:
 *                 type: string
 *                 format: uuid
 *               user_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Đã thêm react cho bình luận thành công
 */

/**
 * @swagger
 * /api/react-comments/delete/{user_id}/{comment_id}:
 *   delete:
 *     summary: Xóa lượt react khỏi bình luận
 *     tags: [ReactComments]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID của bình luận
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Đã xóa react khỏi bình luận thành công
 */
