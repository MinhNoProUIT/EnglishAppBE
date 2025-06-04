// src/services/payment.service.js
const payos = require("../utils/payosClient");
const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

exports.createOrder = async ({ userId, amount, description }) => {
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
};

exports.checkOrderStatus = async (orderCode) => {
  const order = await payos.getPaymentLinkInformation(orderCode);
  if (order.status === "PAID") {
    // Cập nhật DB khi thanh toán thành công
    await prisma.transaction_history.updateMany({
      where: { order_code: `${orderCode}` },
      data: { status: "PAID", paid_at: new Date() },
    });
  }
  return order.status;
};
