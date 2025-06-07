const UserPackageService = require("../services/UserPackageService");
const { Parser } = require("json2csv");
const { formatResponse } = require("../utils/responseHelper");
const { getCurrentUserId } = require("../utils/CurrentUser");
const UserService = require("../services/UserService"); // 👈 Import thêm dòng này

const UserPackageController = {
  async createUserPackage(req, res) {
    try {
      const package_id = req.body;
      const created = await UserPackageService.createUserPackage(
        getCurrentUserId(req),
        package_id
      );
      await UserService.upgradeToPremium(getCurrentUserId(req));

      res.status(201).json(formatResponse(true, created));
    } catch (err) {
      console.error("Error in createUserPackage:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },
};

module.exports = UserPackageController;
