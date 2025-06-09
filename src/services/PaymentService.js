// src/services/payment.service.js
const payos = require("../utils/payosClient");
const UserPackageService = require("./UserPackageService"); // 👈 import
const { parseMoneyToInt } = require("../utils/moneyUtils"); // 👈 thêm nếu cần chuyển đổi kiểu tiền
const UserService = require("./UserService"); // 👈 import

const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const PaymentService = {
  async createOrder({ userId, amount, description }) {
    const orderCode = Date.now();

    const paymentLink = await payos.createPaymentLink({
      orderCode,
      amount,
      description,
      returnUrl: "https://englishapp-uit.onrender.com/payment-success",
      cancelUrl: "https://englishapp-uit.onrender.com/payment-cancel",
    });

    // Lưu tạm đơn chưa thanh toán
    await prisma.transaction_history.create({
      data: {
        user_id: userId,
        amount,
        description,
        order_code: `${orderCode}`,
        status: "PENDING",
      },
    });

    return {
      orderCode,
      checkoutUrl: paymentLink.checkoutUrl,
      qrCode: paymentLink.qrCode,
    };
  },

  async checkOrderStatus(orderCode) {
    const order = await payos.getPaymentLinkInformation(orderCode);
    if (order.status === "PAID") {
      const transaction = await prisma.transaction_history.findFirst({
        where: { order_code: `${orderCode}` },
      });

      if (!transaction) throw new Error("Transaction not found");
      // Cập nhật DB khi thanh toán thành công
      await prisma.transaction_history.updateMany({
        where: { order_code: `${orderCode}` },
        data: { status: "PAID", paid_at: new Date() },
      });

      const premiumPackage = await prisma.premium_packages.findFirst({
        where: { name: transaction.description },
      });

      if (
        premiumPackage &&
        parseMoneyToInt(transaction.amount) >= premiumPackage.price
      ) {
        // Gọi tạo user package
        await UserPackageService.createUserPackage(
          transaction.user_id,
          premiumPackage.id
        );

        await UserService.upgradeToPremium(transaction.user_id);
      }
    }
    return order.status;
  },

  async getAllPayment() {
    return await prisma.transaction_history.findMany();
  },

  async createPayment(user_id, amount, orderCode, description) {
    const first8Chars = description.slice(0, 8);
    if (!user_id.includes(first8Chars)) return;
    const newPayment = await prisma.transaction_history.create({
      data: {
        user_id: user_id,
        amount,
        order_code: orderCode,
        description,
        status: "PAID", // Trạng thái mặc định là "PENDING"
      },
    });

    const trimmedDescription = description.slice(8);

    const premiumPackage = await prisma.premium_packages.findFirst({
      where: { name: trimmedDescription },
    });

    if (premiumPackage && parseMoneyToInt(amount) >= premiumPackage.price) {
      // Gọi tạo user package
      await UserPackageService.createUserPackage(user_id, premiumPackage.id);

      await UserService.upgradeToPremium(user_id);
    }

    //await UserService.updateUserIsPremium(user_id);

    return newPayment;
  },
};

module.exports = PaymentService;
