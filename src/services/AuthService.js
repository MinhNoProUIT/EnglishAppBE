const bcrypt = require("bcrypt");
const admin = require("../config/firebase");
const UserService = require("../services/UserService");
const UserCoinService = require("./UserCoinService");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const PremiumPackageService = require("../services/PremiumPackageService");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db"); // Sử dụng pool của PostgreSQL
const { email, jwtKey } = require("../config/email.config");
const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const { verifyAccessToken } = require("../utils/jwt");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email.user, // Địa chỉ email của bạn
    pass: email.pass, // Mật khẩu ứng dụng của Gmail (hoặc mật khẩu email)
  },
});

const AuthService = {
  async createUser({ username, email, password, confirmPassword }) {
    const userByUsername = await UserService.findUserByUsername(username);
    if (userByUsername) {
      throw new Error("Username đã tồn tại");
    }

    const userByEmail = await UserService.findUserByEmail(email);
    if (userByEmail) {
      throw new Error("Email đã tồn tại");
    }

    if (password !== confirmPassword) {
      throw new Error("Mật khẩu không khớp");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRecord = await admin
      .auth()
      .createUser({
        email,
        password,
        displayName: username,
      })
      .catch((error) => {
        throw new Error(`Firebase user creation failed: ${error.message}`);
      });

    const newUser = await UserService.createUser({
      username,
      email,
      passwordhash: hashedPassword,
      firebase_uid: userRecord.uid,
      isVerified: false,
    });

    if (!newUser) {
      throw new Error("Không thể tạo người dùng mới");
    }
    await UserCoinService.createUserCoin(newUser.id);

    return {
      message: "User tạo thành công. Vui lòng xác thực email",
      user: newUser,
    };
  },
  async login({ email, password }) {
    console.log("Email nhập vào:", email);

    const user = await UserService.findUserByEmail(email);
    if (!user) {
      throw new Error("Email không tồn tại");
    }

    const userStatus = await UserService.getUserStatus(email);
    if (!userStatus) {
      throw new Error("Tài khoản đã bị xóa hoặc bị khóa");
    }

    const isMatch = await bcrypt.compare(password, user.passwordhash);

    if (!isMatch) {
      throw new Error("Sai mật khẩu");
    }

    const payload = {
      userId: user.id,
      isAdmin: user.is_admin || false,
    };

    await PremiumPackageService.checkAndUpdatePremiumStatus(user.id);

    return {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
      userId: user.id,
      role: payload.isAdmin,
    };
  },

  async changePassword({ user_id, oldPassword, newPassword }) {
    // Tìm người dùng từ Firebase qua UID
    const user = await UserService.getUserById(user_id);
    if (!user) throw new Error("Người dùng không tồn tại");

    // So sánh mật khẩu cũ với mật khẩu đã lưu trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(oldPassword, user.passwordhash);
    if (!isMatch) throw new Error("Mật khẩu cũ không đúng");

    // Kiểm tra mật khẩu mới không giống mật khẩu cũ
    if (oldPassword === newPassword) {
      throw new Error("Mật khẩu mới không thể giống mật khẩu cũ");
    }

    // Mã hóa mật khẩu mới
    const newHashed = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu trên Firebase
    await admin.auth().updateUser(user.firebase_uid, { password: newPassword });

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    await UserService.updatePassword(user_id, newHashed);

    return { message: "Mật khẩu đã được thay đổi thành công" };
  },

  async logout(uid) {
    await admin.auth().revokeRefreshTokens(uid);
  },

  async refresh(refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken);

      // Lưu ý: Kiểm tra kỹ tên key phải đúng như khi sign ban đầu
      const newPayload = {
        userId: payload.userId,
        isAdmin: payload.isAdmin,
      };

      const newAccessToken = signAccessToken(newPayload);
      const newRefreshToken = signRefreshToken(newPayload);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new Error("Refresh token không hợp lệ hoặc đã hết hạn");
    }
  },
  async me(userID) {
    const user = await UserService.findUserByUserId(userID);
    if (!user) throw new Error("Người dùng không tồn tại");
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.isAdmin || false,
    };
  },

  async sendResetPasswordEmail(Email) {
    // Kiểm tra xem người dùng có tồn tại không
    const result = await UserService.findUserByEmail(Email);
    if (!result) {
      throw new Error("Email không tồn tại");
    }

    const user = result;

    // Tạo token xác minh
    const token = jwt.sign({ userId: user.id }, jwtKey, { expiresIn: "1h" });

    const resetLink = `https://englishapp-uit.onrender.com/auth/reset-password/${token}`;

    const mailOptions = {
      from: email.user,
      to: Email,
      subject: "Đặt lại mật khẩu",
      text: `Click vào liên kết này để đặt lại mật khẩu của bạn: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    return { message: "Email đặt lại mật khẩu đã được gửi!", token };
  },

  async resetPassword(token, newPassword) {
    // Xác minh token và lấy userId từ token
    const decoded = verifyAccessToken(token);

    if (!decoded || !decoded.userId) {
      throw new Error("Token không hợp lệ hoặc đã hết hạn");
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu của người dùng trong cơ sở dữ liệu
    const user = await prisma.users.update({
      where: { id: decoded.userId }, // Tìm người dùng theo userId từ token
      data: { passwordhash: hashedPassword }, // Cập nhật mật khẩu đã mã hóa
    });

    if (!user) {
      throw new Error("Người dùng không tìm thấy");
    }

    return { message: "Mật khẩu đã được thay đổi thành công!" };
  },
};

module.exports = AuthService;
