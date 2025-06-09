const UserCoinService = require("../services/UserCoinService");
const { formatResponse } = require("../utils/responseHelper");
const { getCurrentUserId } = require("../utils/CurrentUser");

const UserCoinController = {
  // Hàm tạo UserCoin cho người dùng
  async createUserCoin(req, res) {
    try {
      const user_id = getCurrentUserId(req); // Lấy user_id từ request
      const createdCoin = await UserCoinService.createUserCoin(user_id);
      res.status(201).json(formatResponse(true, createdCoin));
    } catch (err) {
      console.error("Error in createUserCoin:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },

  // Hàm cập nhật total_coin của người dùng
  async updateTotalCoin(req, res) {
    try {
      const user_id = getCurrentUserId(req); // Lấy user_id từ request
      const { coinChange } = req.body; // Lấy coinChange từ body
      const updatedCoin = await UserCoinService.updateTotalCoin(
        user_id,
        coinChange
      );
      res.json(formatResponse(true, updatedCoin));
    } catch (err) {
      console.error("Error in updateTotalCoin:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },

  // Hàm lấy giá trị total_coin hiện tại của người dùng
  async getCurrentCoin(req, res) {
    try {
      const user_id = getCurrentUserId(req); // Lấy user_id từ request
      const currentCoin = await UserCoinService.getCurrentCoin(user_id);
      res.json(formatResponse(true, currentCoin));
    } catch (err) {
      console.error("Error in getCurrentCoin:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },
};

module.exports = UserCoinController;
