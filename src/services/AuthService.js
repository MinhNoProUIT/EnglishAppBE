const bcrypt = require("bcrypt");
const admin = require("../config/firebase");
const UserService = require("../services/UserService");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

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

    const isMatch = await bcrypt.compare(password, user.passwordhash);

    if (!isMatch) {
      throw new Error("Sai mật khẩu");
    }

    const payload = {
      userId: user.id,
      isAdmin: user.is_admin || false,
    };

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

    // Mã hóa mật khẩu mới
    const newHashed = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu trên Firebase
    await admin.auth().updateUser(user.uid, { password: newPassword });

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
};

module.exports = AuthService;
