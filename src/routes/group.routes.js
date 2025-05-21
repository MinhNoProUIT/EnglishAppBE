const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const GroupController = require("../controllers/GroupController");

router.post("/create", upload.single('image'), GroupController.createGroup);
router.put("/edit/:id", GroupController.editGroup);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Group
 *   description: Các API quản lý nhóm người dùng
 */
/**
 * @swagger
 * /api/groups/create:
 *   post:
 *     summary: Tạo một nhóm mới
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               created_by:
 *                 type: string
 *                 format: uuid
 *               count_member:
 *                 type: integer
 *                 default: 1
 *               user_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       201:
 *         description: Nhóm được tạo thành công, bao gồm cả thành viên
 *       400:
 *         description: Dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /api/groups/edit/{id}:
 *   put:
 *     summary: Chỉnh sửa thông tin nhóm
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của nhóm
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
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật nhóm thành công
 *       404:
 *         description: Không tìm thấy nhóm
 */
