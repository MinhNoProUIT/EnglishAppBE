const pool = require("../config/db");
const Message = require("../models/Message");

const MessageService = {
  async sendMessage(data) {
    const { sender_id, group_id, content } = data;

    const result = await pool.query(
      `INSERT INTO messages 
         (sender_id, group_id, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [sender_id, group_id, content]
    );

    return new Message(result.rows[0]);
  },

  async getAllMessagesInGroup(group_id) {
    const result = await pool.query(
      `SELECT m.id, m.sender_id, u.username AS sender_username, u.image_url AS sender_image_url, m.content, m.created_date
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.group_id = $1
       ORDER BY m.created_date ASC`,
      [group_id]
    );

    return result.rows;
  }
};

module.exports = MessageService;
