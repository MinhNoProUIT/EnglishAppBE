const { mapGetAllUserErrorReportsToVModel, mapCreateUserErrorReportToVModel, mapRejectUserErrorReportToVModel, mapAcceptUserErrorReportToVModel } = require("../mappings/UserErrorReportMapping");
const UserErrorReportService = require("../services/UserErrorReportService");

const UserErrorReportController = {
  async getAllUserErrorReports(req, res) {
    try {
      const allReports = await UserErrorReportService.getAllUserErrorReports();
      res.json(allReports.map(mapGetAllUserErrorReportsToVModel));
    } catch (err) {
      console.error("Error in get all reports:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createUserErrorReport(req, res) {
    try {
      const newReport = await UserErrorReportService.createUserErrorReport(req.body);
      res.status(201).json(mapCreateUserErrorReportToVModel(newReport));
    } catch (err) {
      console.error("Error in create user error report:", err);
      res.status(400).json({ error: err.message });
    }
  },

  async rejectUserErrorReport(req, res) {
    try {
      const { id } = req.params;
      const updateReport = await UserErrorReportService.rejectUserErrorReport(id);
      res.status(200).json(mapRejectUserErrorReportToVModel(updateReport));
    } catch (err) {
      console.error("Error in reject user error report:", err);
      res.status(400).json({ error: err.message });
    }
  },

  async acceptUserErrorReport(req, res) {
    try {
      const { id } = req.params;
      const updateReport = await UserErrorReportService.acceptUserErrorReport(id);
      res.status(200).json(mapAcceptUserErrorReportToVModel(updateReport));
    } catch (err) {
      console.error("Error in accept user error report:", err);
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = UserErrorReportController;
