const express = require("express");
const router = express.Router();
const UserCoinController = require("../controllers/UserCoinController");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/user-coins/user-coin:
 *   post:
 *     summary: Create a new user coin
 *     description: This API creates a new user coin for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User coin created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/user-coin", authMiddleware, UserCoinController.createUserCoin);

/**
 * @swagger
 * /api/user-coins/user-coin:
 *   put:
 *     summary: Update user coin total
 *     description: This API updates the total coin of the logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coinChange:
 *                 type: integer
 *                 description: The number of coins to add (positive) or subtract (negative)
 *                 example: 5
 *     responses:
 *       200:
 *         description: Coin updated successfully
 *       500:
 *         description: Internal Server Error
 */
router.put("/user-coin", authMiddleware, UserCoinController.updateTotalCoin);

/**
 * @swagger
 * /api/user-coins/user-coin:
 *   get:
 *     summary: Get current user coin
 *     description: This API fetches the current total coin of the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched current coin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Success:
 *                   type: boolean
 *                   example: true
 *                 Data:
 *                   type: integer
 *                   example: 20
 *       500:
 *         description: Internal Server Error
 */
router.get("/user-coin", authMiddleware, UserCoinController.getCurrentCoin);

module.exports = router;
