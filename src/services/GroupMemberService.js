const pool = require("../config/db");

const GroupMemberService = {
  async addMembers(data) {
    const { user_ids, group_id, is_admin = false } = data; 
    const client = await pool.connect();
  
    try {
      await client.query("BEGIN");
  
      const values = user_ids
        .filter((id) => !!id) 
        .map((id) => `('${id}', '${group_id}', ${is_admin})`)
        .join(",");
  
      if (values.length === 0) {
        throw new Error("No valid user_ids to insert.");
      }
  
      const insertQuery = `
        INSERT INTO group_members (user_id, group_id, is_admin)
        VALUES ${values}
        RETURNING *`;
  
      const result = await client.query(insertQuery);
  
      await client.query(
        `UPDATE groups
         SET count_member = COALESCE(count_member, 0) + $1
         WHERE id = $2`,
        [result.rows.length, group_id]
      );
  
      await client.query("COMMIT");
  
      return result.rows;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  
  async kickMembers(data) {
    const { user_ids, group_id } = data; 
    const client = await pool.connect();
  
    try {
      await client.query("BEGIN");
  
      if (!user_ids || user_ids.length === 0) {
        throw new Error("No user IDs provided");
      }
      // Tạo danh sách placeholder: $1, $2, ..., $n
      const placeholders = user_ids.map((_, index) => `$${index + 1}`).join(", ");
      const groupIdPlaceholder = `$${user_ids.length + 1}`;
  
      const deleteQuery = `
        DELETE FROM group_members
        WHERE user_id IN (${placeholders}) AND group_id = ${groupIdPlaceholder}
        RETURNING *
      `;
  
      const deleteResult = await client.query(deleteQuery, [...user_ids, group_id]);
  
      if (deleteResult.rows.length === 0) {
        throw new Error("No members removed. Either group_id is invalid or users not in group.");
      }
  
      await client.query(
        `UPDATE groups
         SET count_member = GREATEST(COALESCE(count_member, 0) - $1, 0)
         WHERE id = $2`,
        [deleteResult.rowCount, group_id]
      );
  
      await client.query("COMMIT");
      return deleteResult.rows;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  
  async leaveGroup(data) {
    const { user_id, group_id } = data; 
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const deleteResult = await client.query(
        `DELETE FROM group_members
         WHERE user_id = $1 AND group_id = $2
         RETURNING *`,
        [user_id, group_id]
      );

      if (deleteResult.rows.length === 0) {
        throw new Error("Member not found in the group");
      }

      await client.query(
        `UPDATE groups
         SET count_member = GREATEST(COALESCE(count_member, 0) - 1, 0)
         WHERE id = $1`,
        [group_id]
      );
  
      await client.query("COMMIT");
      return deleteResult.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async dishBand(group_id) {
    const client = await pool.connect();
  
    try {
      await client.query("BEGIN");
  
      await client.query(
        `DELETE FROM group_members WHERE group_id = $1`,
        [group_id]
      );
  
      const deleteResult = await client.query(
        `DELETE FROM groups WHERE id = $1 RETURNING *`,
        [group_id]
      );
  
      if (deleteResult.rows.length === 0) {
        throw new Error("Group not found");
      }
  
      await client.query("COMMIT");
  
      return deleteResult.rows[0]; 
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  
  async getAllMemberInGroup(groupId) {
    const result = await pool.query(
      `SELECT gm.id, gm.user_id, gm.is_admin, u.username, u.image_url
       FROM group_members gm
       JOIN users u ON gm.user_id = u.id
       WHERE gm.group_id = $1`,
      [groupId]
    );
    return result.rows;
  },

  async getAllGroupByUser(userId) {
    const result = await pool.query(
      `SELECT 
          g.id,
          g.name AS group_name,
          g.image_url AS group_image_url,
          u.username AS last_username,
          m.content AS last_message,
          m.created_date AS last_time_message
       FROM groups g
       JOIN group_members gm ON g.id = gm.group_id
       LEFT JOIN LATERAL (
          SELECT m.content, m.created_date, m.sender_id
          FROM messages m
          WHERE m.group_id = g.id
          ORDER BY m.created_date DESC
          LIMIT 1
       ) m ON true
       LEFT JOIN users u ON m.sender_id = u.id
       WHERE gm.user_id = $1`,
      [userId]
    );
  
    return result.rows;
  }  
};

module.exports = GroupMemberService;
