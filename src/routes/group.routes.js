const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const GroupController = require("../controllers/GroupController");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  GroupController.createGroup
);
router.put(
  "/edit/:id",
  authMiddleware,
  upload.single("image"),
  GroupController.editGroup
);
router.get("/details/:id", authMiddleware, GroupController.getDetailsGroup);

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
 *     responses:
 *       200:
 *         description: Cập nhật nhóm thành công
 *       404:
 *         description: Không tìm thấy nhóm
 */

/**
 * @swagger
 * /api/groups/details/{id}:
 *  get:
 *    summary: Lấy thông tin chi tiết của một nhóm
 *    tags: [Group]
 *    parameters:
 *    - in: path
 *      name: id
 *    required: true
 *    description: ID của nhóm
 *    schema:
 *      type: string
 *      format: uuid
 *    responses:
 *      200:
 *        description: Thông tin chi tiết của nhóm
 *      404:
 *        description: Không tìm thấy nhóm
 *      400:
 *        description: Lỗi không xác định
 */
