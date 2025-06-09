const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();
const UserCoin = {
  async createUserCoin(user_id) {
    try {
      const userCoin = await prisma.user_coins.create({
        data: {
          user_id: user_id,
        },
      });
      return userCoin;
    } catch (error) {
      console.error("Error creating user coin:", error);
      throw error;
    }
  },

  async updateTotalCoin(user_id, coinChange) {
    try {
      const userCoin = await prisma.user_coins.findFirst({
        where: {
          user_id: user_id,
        },
      });

      if (!userCoin) {
        throw new Error("User coin not found");
      }

      const updatedTotalCoin = userCoin.total_coin + coinChange;

      const updatedUserCoin = await prisma.user_coins.update({
        where: {
          user_id: user_id,
        },
        data: {
          total_coin: updatedTotalCoin,
        },
      });

      return updatedUserCoin;
    } catch (error) {
      console.error("Error updating total coin:", error);
      throw error;
    }
  },

  async getCurrentCoin(user_id) {
    try {
      const userCoin = await prisma.user_coins.findFirst({
        where: {
          user_id: user_id, // Tìm kiếm theo user_id
        },
      });

      if (!userCoin) {
        throw new Error("User coin not found");
      }

      return userCoin.total_coin; // Trả về giá trị total_coin hiện tại của user
    } catch (error) {
      console.error("Error getting current total coin:", error);
      throw error; // Ném lỗi nếu có
    }
  },
};

module.exports = UserCoin;
