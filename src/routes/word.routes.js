const express = require("express");
const router = express.Router();
const WordController = require("../controllers/WordController");

router.get("/getAll", WordController.getAllWords);
router.post("/create", WordController.createWord);
router.put("/update/:id", WordController.updateWord);
router.delete("/delete/:id", WordController.deleteWord);
router.get("/getAllByCourse/:id", WordController.getAllWordsByCourse);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Words
 *   description: Các API quản lý từ vựng
 */

/**
 * @swagger
 * /api/words/getAll:
 *   get:
 *     summary: Lấy danh sách tất cả từ vựng
 *     tags: [Words]
 *     responses:
 *       200:
 *         description: Danh sách từ vựng
 */

/**
 * @swagger
 * /api/words/create:
 *   post:
 *     summary: Tạo từ vựng mới
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               englishname:
 *                 type: string
 *               vietnamesename:
 *                 type: string
 *               type:
 *                 type: string
 *               examplesentence:
 *                 type: string
 *               imageurl:
 *                 type: string
 *               transcription:
 *                 type: string
 *               course_id:
 *                 type: string
 *                 format: uuid
 *             example:
 *               englishname: student
 *               vietnamesename: học sinh, sinh viên
 *               type: n
 *               examplesentence: She is a student.
 *               imageurl: https://example.com/image.png
 *               transcription: ˈsto͞od(ə)nt 
 *               course_id: 5e88a3e4-b2f3-4d59-9c6a-788e0f4dcc6f
 *     responses:
 *       201:
 *         description: Đã tạo từ vựng thành công
 */

/**
 * @swagger
 * /api/words/update/{id}:
 *   put:
 *     summary: Chỉnh sửa từ vựng
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID từ vựng cần chỉnh sửa
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
 *               englishname:
 *                 type: string
 *               vietnamesename:
 *                 type: string
 *               type:
 *                 type: string
 *               examplesentence:
 *                 type: string
 *               imageurl:
 *                 type: string
 *               transcription:
 *                 type: string
 *               course_id:
 *                 type: string
 *                 format: uuid
 *             example:
 *               englishname: student
 *               vietnamesename: học sinh, sinh viên
 *               type: n
 *               examplesentence: She is a student.
 *               imageurl: https://example.com/image.png
 *               transcription: ˈsto͞od(ə)nt 
 *               course_id: 5e88a3e4-b2f3-4d59-9c6a-788e0f4dcc6f
 *     responses:
 *       200:
 *         description: Đã chỉnh sửa từ vựng thành công
 */

/**
 * @swagger
 * /api/words/delete/{id}:
 *   delete:
 *     summary: Xóa từ vựng
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID từ vựng cần xóa
 *     responses:
 *       200:
 *         description: Xóa từ vựng thành công
 */

/**
 * @swagger
 * /api/words/getAllByCourse/{id}:
 *   get:
 *     summary: Lấy danh sách tất cả từ vựng theo khóa học
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Danh sách từ vựng của khóa học
 */