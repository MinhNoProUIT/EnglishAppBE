const express = require("express");
const router = express.Router();
const UserCoinController = require("../controllers/UserCoinController");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/user-coin", authMiddleware, UserCoinController.createUserCoin);

router.put("/user-coin", authMiddleware, UserCoinController.updateTotalCoin);

router.get("/user-coin", authMiddleware, UserCoinController.getCurrentCoin);

module.exports = router;
