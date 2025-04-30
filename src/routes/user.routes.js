const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/GetAll", UserController.getUsers);
router.post("/Create", UserController.createUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Các API quản lý người dùng
 */

/**
 * @swagger
 * /api/users/GetAll:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]    # Đặt tên nhóm ở đây
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */

/**
 * @swagger
 * /api/users/Create:
 *   post:
 *     summary: Tạo người dùng mới
 *     tags: [Users]    # Nhóm lại với "Users"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               passwordhash:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã tạo user thành công
 */

router.post("/", UserController.createUser);
