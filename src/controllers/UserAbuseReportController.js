const {
  mapGetAllUserAbuseReportToVModel,
} = require("../mappings/UserAbuseReportMapping");
const UserAbuseReportService = require("../services/UserAbuseReportService");
const { Parser } = require("json2csv");

const UserAbuseReportController = {
  async getAllUserAbuseReport(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const { reports, total } =
        await UserAbuseReportService.getAllUserAbuseReport(limit, page);

      res.json({
        data: reports,
        pagination: {
          total,
          page,
          limit,
        },
      });
    } catch (err) {
      console.error("Error in getAllUserAbuseReport:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getMonthlyUserAbuseReportSummary(req, res) {
    try {
      const reports =
        await UserAbuseReportService.getMonthlyUserAbuseReportSummary();
      res.json(reports);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createUserAbuseReport(req, res) {
    try {
      const data = req.body;
      const created = await UserAbuseReportService.createUserAbuseReport(data);
      res.status(201).json(created);
    } catch (err) {
      console.error("Error in createUserAbuseReport:", err);
      res.status(400).json({ error: err.message });
    }
  },

  async deleteUserAbuseReport(req, res) {
    try {
      const { id } = req.params;
      await UserAbuseReportService.deleteUserAbuseReport(id);
      res.json({ message: `Deleted User Abuse Report with id ${id}` });
    } catch (err) {
      console.error("Error in deleteUserAbuseReport:", err);
      res.status(400).json({ error: err.message });
    }
  },

  async exportUserAbuseReport(req, res) {
    try {
      const reports = await UserAbuseReportService.getAllUserAbuseReport();

      const fields = ["id", "user_id", "content", "created_date"];

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(reports);

      res.header("Content-Type", "text/csv");
      res.attachment("user_abuse_report.csv");
      return res.send(csv);
    } catch (err) {
      console.error("Error in exportUserAbuseReport:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserAbuseReportController;
