const AttendanceService = require("../services/AttendanceService");
const { Parser } = require("json2csv");

const AttendanceController = {
  async getAllUserAttendance(req, res) {
    try {
      const id = req.id;
      if (id === null) return;

      const attendance = AttendanceService.getAllUserAttendance(id);
      res.json(attendance);
    } catch (err) {
      console.error("Error in getAllUserAttendance:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllAttendance(req, res) {
    try {
      const attendance = AttendanceService.getAllAttendance();
      res.json(attendance);
    } catch (err) {
      console.error("Error in getAllAttendance:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = AttendanceController;
