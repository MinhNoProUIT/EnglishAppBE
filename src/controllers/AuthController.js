const { transforms } = require("json2csv");
const AuthService = require("../services/AuthService");
const { getCurrentUserId } = require("../utils/CurrentUser");
const AuthController = {
  async register(req, res) {
    try {
      const result = await AuthService.createUser(req.body);
      console.log("result", result);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });
      res.json({ message: "Đăng nhập thành công", ...result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;

      // Kiểm tra xem mật khẩu mới có giống mật khẩu cũ không
      if (oldPassword === newPassword) {
        throw new Error("Mật khẩu mới không thể giống mật khẩu cũ");
      }

      // Gọi service để thay đổi mật khẩu
      await AuthService.changePassword({
        user_id: getCurrentUserId(req),
        oldPassword,
        newPassword,
      });

      res.json({ message: "Đổi mật khẩu thành công" });
    } catch (err) {
      res.status(400).json({ error: err.message || "Đã có lỗi xảy ra" });
    }
  },
  async logout(req, res) {
    try {
      console.log(getCurrentUserId(req));
      await AuthService.logout(req.user.uid);
      res.json({ message: "Đã đăng xuất" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async me(req, res) {
    try {
      const user = await AuthService.me(req.user.userId);
      res.json(user); // đã gồm id, username, email, isAdmin
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async forgotPassword(req, res) {
    const { email } = req.body; // Lấy email từ req.body

    if (!email) {
      return res.status(400).json({ error: "Email is required" }); // Nếu không có email, trả về lỗi 400
    }

    try {
      const response = await AuthService.sendResetPasswordEmail(email); // Gọi service để gửi email
      res.json(response); // Trả về phản hồi khi email đã được gửi
    } catch (error) {
      res.status(400).json({ error: error.message }); // Nếu có lỗi, trả về lỗi với mã 400
    }
  },

  async resetPassword(req, res) {
    const { token } = req.params; // Lấy token từ URL params
    const { newPassword } = req.body; // Lấy mật khẩu mới từ request body

    try {
      const response = await AuthService.resetPassword(token, newPassword);
      res.json(response); // Trả về phản hồi khi mật khẩu được thay đổi thành công
    } catch (error) {
      res.status(400).json({ error: error.message }); // Trả về lỗi khi có vấn đề với việc đặt lại mật khẩu
    }
  },
};

module.exports = AuthController;
