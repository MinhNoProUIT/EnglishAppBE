const AttendanceService = require("../services/AttendanceService");
const { Parser } = require("json2csv");
const { formatResponse } = require("../utils/responseHelper");
const { getCurrentUserId } = require("../utils/CurrentUser");

const AttendanceController = {
  async getAllUserAttendance(req, res) {
    try {
      // const id = req.id;
      // if (id === null) return;

      const attendance = await AttendanceService.getAllUserAttendance(
        getCurrentUserId(req)
      );
      res.json(formatResponse(true, attendance));
    } catch (err) {
      console.error("Error in getAllUserAttendance:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },

  async getAllAttendance(req, res) {
    try {
      const attendance = await AttendanceService.getAllAttendance();
      res.json(formatResponse(true, attendance));
    } catch (err) {
      console.error("Error in getAllAttendance:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },

  async createAttendance(req, res) {
    try {
      //const data = req.body;
      const created = await AttendanceService.createAttendance(
        getCurrentUserId(req)
      );
      res.status(201).json(formatResponse(true, created));
    } catch (err) {
      console.error("Error in createAttendance:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },

  async deleteAttendance(req, res) {
    try {
      const { id } = req.params;
      await AttendanceService.deleteAttendance(id);
      res.json(formatResponse(true, id, `Deleted Attendance with id ${id}`));
    } catch (err) {
      console.error("Error in deleteAttendance:", err);
      res.status(400).json({
        Success: false,
        Data: null,
        Message: err.message,
      });
    }
  },

  async getMonthlyAttendanceSummary(req, res) {
    try {
      const attendance = await AttendanceService.getMonthlyAttendanceSummary();
      res.json(formatResponse(true, attendance));
    } catch (err) {
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },

  async getWeeklyAttendanceStatus(req, res) {
    try {
      const user_id = getCurrentUserId(req);
      const result = await AttendanceService.getWeeklyAttendanceStatus(user_id);
      res.json(formatResponse(true, result));
    } catch (err) {
      console.error("Error in getWeeklyAttendanceStatus:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },
};

module.exports = AttendanceController;
