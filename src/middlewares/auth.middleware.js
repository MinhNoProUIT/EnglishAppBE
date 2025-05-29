// middlewares/authMiddleware.js
const { verifyAccessToken } = require("../utils/jwt");

/**
 * Middleware xác thực Access Token do hệ thống tạo (không dùng Firebase).
 * Token cần được gửi trong header: Authorization: Bearer <access_token>
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kiểm tra xem có header không và có đúng định dạng không
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Thiếu hoặc sai định dạng Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Giải mã token
    const decoded = verifyAccessToken(token);

    // Gắn thông tin người dùng vào request để dùng trong controller
    req.user = {
      userId: decoded.userId,
      isAdmin: decoded.isAdmin,
    };

    next(); // Cho phép đi tiếp
  } catch (err) {
    console.warn("Xác thực token thất bại:", err.message);
    return res
      .status(401)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

module.exports = authMiddleware;
