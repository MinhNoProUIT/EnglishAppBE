const express = require("express");
const router = express.Router();
const TopicController = require("../controllers/TopicController");

router.get("/getAll", TopicController.getAllTopics);
router.post("/create", TopicController.createTopic);
router.put("/update/:id", TopicController.updateTopic);
router.delete("/delete/:id", TopicController.deleteTopic);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Topics
 *   description: Các API quản lý chủ đề
 */

/**
 * @swagger
 * /api/topics/getAll:
 *   get:
 *     summary: Lấy danh sách tất cả chủ đề
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: Danh sách chủ đề
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 */

/**
 * @swagger
 * /api/topics/create:
 *   post:
 *     summary: Tạo chủ đề mới
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               decription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã tạo chủ đề thành công
 */

/**
 * @swagger
 * /api/topics/update/{id}:
 *   put:
 *     summary: Chỉnh sửa chủ đề
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID chủ đề cần chỉnh sửa
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
 *               name:
 *                 type: string
 *               decription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã chỉnh sửa chủ đề thành công
 */

/**
 * @swagger
 * /api/topics/delete/{id}:
 *   delete:
 *     summary: Xóa chủ đề
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID chủ đề cần xóa
 *     responses:
 *       200:
 *         description: Xóa chủ đề thành công
 */