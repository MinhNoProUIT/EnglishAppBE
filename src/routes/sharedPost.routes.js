const express = require("express");
const router = express.Router();
const SharedPostController = require("../controllers/SharedPostController");

router.get("/getAll", SharedPostController.getAllSharedPost);
router.post("/create", SharedPostController.createSharedPost);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SharedPost
 *   description: Các API quản lý các bài viết chia sẻ
 */

/**
 * @swagger
 * /api/shared-post/getAll:
 *   get:
 *     summary: Lấy tất cả các bài viết đã chia sẻ
 *     tags: [SharedPost]
 *     responses:
 *       200:
 *         description: Danh sách các bài viết đã chia sẻ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   post_id:
 *                     type: string
 *                     format: uuid
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                   shared_post_id:
 *                     type: string
 *                     format: uuid
 *                   react_count:
 *                     type: integer
 *                   comment_count:
 *                     type: integer
 *                   shared_count:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   created_date:
 *                     type: string
 *                     format: date-time
 */

/**
 * @swagger
 * /api/shared-post/create:
 *   post:
 *     summary: Tạo một bài viết chia sẻ mới
 *     tags: [SharedPost]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               post_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               shared_post_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               content:
 *                 type: string
 *               react_count:
 *                 type: integer
 *                 default: 0
 *               comment_count:
 *                 type: integer
 *                 default: 0
 *               shared_count:
 *                 type: integer
 *                 default: 0
 *     responses:
 *       201:
 *         description: Đã tạo bài viết chia sẻ thành công
 */


