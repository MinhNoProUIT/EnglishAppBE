const PremiumPackageService = require("../services/PremiumPackageService");
const { formatResponse } = require("../utils/responseHelper");

const PremiumPackageController = {
  async getAllPremiumPackage(req, res) {
    try {
      const premium_packages =
        await PremiumPackageService.getAllPremiumPackages();
      res.json(formatResponse(true, premium_packages));
    } catch (err) {
      console.error("Error in getAllPremiumPackage:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },
};

module.exports = PremiumPackageController;
