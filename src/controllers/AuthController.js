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
      await AuthService.changePassword({
        uid: req.user.uid,
        oldPassword,
        newPassword,
      });
      res.json({ message: "Đổi mật khẩu thành công" });
    } catch (err) {
      res.status(400).json({ error: err.message });
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
};

module.exports = AuthController;
