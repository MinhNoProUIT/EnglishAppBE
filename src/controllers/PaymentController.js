// src/controllers/payment.controller.js
const paymentService = require("../services/PaymentService");
const crypto = require("crypto");

exports.createOrder = async (req, res) => {
  const { userId, amount, description } = req.body;
  try {
    const order = await paymentService.createOrder({
      userId,
      amount,
      description,
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create payment link" });
  }
};

exports.getOrderStatus = async (req, res) => {
  const { orderCode } = req.params;
  try {
    const status = await paymentService.checkOrderStatus(orderCode);
    res.json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get order status" });
  }
};

exports.handleWebhook = async (req, res) => {
  // Log dữ liệu nhận từ webhook
  console.log("Webhook received:", req.body);

  const payload = JSON.stringify(req.body);
  const receivedChecksum = req.headers["x-checksum"]; // Nếu có

  // Nếu cần xác minh checksum
  const hmac = crypto.createHmac("sha256", process.env.PAYOS_CHECKSUM_KEY);
  const calculatedChecksum = hmac.update(payload).digest("hex");

  // Kiểm tra checksum (nếu có)
  if (receivedChecksum !== calculatedChecksum) {
    return res.status(400).json({ message: "Invalid checksum" });
  }

  const { orderCode, status } = req.body;

  if (status === "PAID") {
    // Cập nhật trạng thái thanh toán thành công
    await prisma.transaction_history.updateMany({
      where: { order_code: `${orderCode}` },
      data: { status: "PAID", paid_at: new Date() },
    });
  }

  // Trả về 200 OK để PayOS biết webhook đã được nhận và xử lý
  res.status(200).json({ message: "Webhook received" });
};
