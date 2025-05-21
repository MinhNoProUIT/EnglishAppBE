const express = require("express");
const router = express.Router();
const GroupMemberController = require("../controllers/GroupMemberController");

router.post("/add", GroupMemberController.addMember);
router.put("/kick/:group_id/:user_id", GroupMemberController.kickMember);
router.get("/group/:group_id", GroupMemberController.getAllMemberInGroup);
router.get("/user/:user_id", GroupMemberController.getAllGroupByUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: GroupMember
 *   description: Các API quản lý thành viên trong nhóm
 */

/**
 * @swagger
 * /api/group-members/add:
 *   post:
 *     summary: Thêm thành viên vào nhóm
 *     tags: [GroupMember]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - group_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               group_id:
 *                 type: string
 *                 format: uuid
 *               is_admin:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Thành viên được thêm vào nhóm thành công
 *       400:
 *         description: Thêm thành viên thất bại
 */

/**
 * @swagger
 * /api/group-members/kick/{group_id}/{user_id}:
 *   delete:
 *     summary: Xóa thành viên khỏi nhóm
 *     tags: [GroupMember]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: ID của nhóm
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của thành viên bị xóa
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Xóa thành viên thành công
 *       400:
 *         description: Xóa thành viên thất bại
 */

/**
 * @swagger
 * /api/group-members/group/{group_id}:
 *   get:
 *     summary: Lấy tất cả thành viên trong nhóm
 *     tags: [GroupMember]
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
 *         description: Danh sách thành viên trong nhóm
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
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                   username:
 *                     type: string
 *                   image_url:
 *                     type: string
 *                   is_admin:
 *                     type: boolean
 */

/**
 * @swagger
 * /api/group-members/user/{user_id}:
 *   get:
 *     summary: Lấy danh sách các nhóm mà người dùng tham gia
 *     tags: [GroupMember]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Danh sách các nhóm mà người dùng tham gia
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
 *                     description: ID của nhóm
 *                   group_name:
 *                     type: string
 *                     description: Tên nhóm
 *                   group_image_url:
 *                     type: string
 *                     description: Ảnh đại diện của nhóm
 *                   last_message:
 *                     type: string
 *                     description: Tin nhắn cuối cùng trong nhóm
 *                   last_time_message:
 *                     type: string
 *                     format: date-time
 *                     description: Thời gian gửi tin nhắn cuối cùng
 *                   last_username:
 *                     type: string
 *                     description: Tên người gửi tin nhắn cuối cùng
 *       404:
 *         description: Không tìm thấy nhóm nào cho người dùng
 */


