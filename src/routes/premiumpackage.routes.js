const express = require("express");
const router = express.Router();
const PremiumPackageController = require("../controllers/PremiumPackageController");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: PremiumPackage
 *   description: Quản lý danh sách khóa học V.I.P
 */

/**
 * @swagger
 * /api/premium-package/getAll:
 *   get:
 *     summary: Lấy tất cả điểm danh
 *     tags: [PremiumPackage]
 *     responses:
 *       200:
 *         description: Danh sách khóa học V.I.P
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/getAll", PremiumPackageController.getAllPremiumPackage);

module.exports = router;
