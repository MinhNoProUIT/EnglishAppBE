const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/GroupController");

router.post("/create", GroupController.createGroup);
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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image_url
 *               - created_by
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên nhóm
 *               image_url:
 *                 type: string
 *                 description: Ảnh đại diện nhóm
 *               created_by:
 *                 type: string
 *                 format: uuid
 *                 description: ID người tạo nhóm
 *               count_member:
 *                 type: integer
 *                 default: 1
 *                 description: Tổng số thành viên ban đầu
 *               user_ids:
 *                 type: array
 *                 description: Danh sách ID người dùng tham gia nhóm (bao gồm cả người tạo nếu muốn)
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
