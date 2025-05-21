const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");

router.post("/send", MessageController.sendMesage);
router.get("/getAll/:group_id", MessageController.getAllMessageInGroup);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Các API quản lý tin nhắn trong nhóm
 */

/**
 * @swagger
 * /api/messages/send:
 *   post:
 *     summary: Gửi tin nhắn đến một nhóm
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender_id
 *               - group_id
 *               - content
 *             properties:
 *               sender_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID người gửi tin nhắn
 *               group_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID của nhóm nhận tin nhắn
 *               content:
 *                 type: string
 *                 description: Nội dung tin nhắn
 *     responses:
 *       201:
 *         description: Gửi tin nhắn thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc lỗi gửi tin nhắn
 */

/**
 * @swagger
 * /api/messages/getAll/{group_id}:
 *   get:
 *     summary: Lấy tất cả tin nhắn trong một nhóm
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: ID của nhóm
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lấy danh sách tin nhắn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   sender_id:
 *                     type: string
 *                     format: uuid   
 *                   sender_username:
 *                     type: string
 *                   sender_image_url:
 *                     type: string
 *                   content:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Không thể lấy tin nhắn
 */

