const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const CoinTransactionService = {
  async getAllCoinTransactions() {
    return await prisma.coin_transaction.findMany({
      orderBy: { created_at: "desc" },
      include: {
        users: {
          select: {
            username: true,
            image_url: true,
          },
        },
      },
    });
  },

  async getMonthlyCoinSummary(user_id) {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const rawData = await prisma.coin_transaction.findMany({
      where: {
        user_id,
        created_at: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      select: {
        amount: true,
      },
    });

    let received = 0;
    let spent = 0;
    for (const tx of rawData) {
      if (tx.amount > 0) received += tx.amount;
      if (tx.amount < 0) spent += Math.abs(tx.amount);
    }

    return {
      user_id,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      total_received: received,
      total_spent: spent,
    };
  },

  async createCoinTransaction(data) {
    return await prisma.coin_transaction.create({
      data,
    });
  },

  async deleteCoinTransaction(id) {
    return await prisma.coin_transaction.delete({
      where: { id },
    });
  },
};

module.exports = CoinTransactionService;
