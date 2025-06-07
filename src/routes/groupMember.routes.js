const express = require("express");
const router = express.Router();
const GroupMemberController = require("../controllers/GroupMemberController");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/add", authMiddleware, GroupMemberController.addMembers);
router.delete("/kick/:group_id/:user_id",authMiddleware, GroupMemberController.kickMember);
router.delete("/dishband/:group_id",authMiddleware, GroupMemberController.dishBand);
router.get("/group/:group_id", authMiddleware, GroupMemberController.getAllMemberInGroup);
router.get("/user/:user_id", authMiddleware, GroupMemberController.getAllGroupByUser);

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
 *     summary: Thêm nhiều thành viên vào nhóm
 *     tags: [GroupMember]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_ids
 *               - group_id
 *             properties:
 *               user_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: Danh sách ID của người dùng cần thêm vào nhóm
 *               group_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID của nhóm
 *               is_admin:
 *                 type: boolean
 *                 default: false
 *                 description: Gán quyền admin cho các thành viên (mặc định là false)
 *     responses:
 *       201:
 *         description: Các thành viên được thêm vào nhóm thành công
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
 * /api/group-members/dishband/{group_id}:
 *   delete:
 *     summary: Xóa nhóm
 *     tags: [GroupMember]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group to disband
 *     responses:
 *       200:
 *         description: Group disbanded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Group disbanded successfully
 *       400:
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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


