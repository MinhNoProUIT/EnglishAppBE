const pool = require("../config/db");
const UserErrorReport = require("../models/UserErrorReport");

const UserErrorReportService = {
  async getAllUserErrorReports() {
    try {
      const result = await pool.query(
        `SELECT * FROM user_error_reports WHERE status = 'Pending'`
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching user error reports:", error);
      throw error;
    }
  },
  
  async createUserErrorReport(data) {
    try {
      const { user_id, post_id, title, content, status = "Pending" } = data;

      const result = await pool.query(
        `INSERT INTO user_error_reports 
          (user_id, post_id, title, content, status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [user_id, post_id, title, content, status]
      );
      return new UserErrorReport(result.rows[0]);
    } catch (error) {
      console.error("Error creating user error report:", error);
      throw error;
    }
  },

  async rejectUserErrorReport(id) {
    try {
      const result = await pool.query(
        `UPDATE user_error_reports
         SET status = 'Rejected'
         WHERE id = $1
         RETURNING *`,
        [id]
      );
  
      if (result.rowCount === 0) {
        throw new Error(`No report found with id: ${id}`);
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error rejecting user error report:", error);
      throw error;
    }
  },

  async acceptUserErrorReport(id) {
    try {
      const result = await pool.query(
        `UPDATE user_error_reports
         SET status = 'Accepted'
         WHERE id = $1
         RETURNING *`,
        [id]
      );
  
      if (result.rowCount === 0) {
        throw new Error(`No report found with id: ${id}`);
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error accepting user error report:", error);
      throw error;
    }
  },
};

module.exports = UserErrorReportService;
