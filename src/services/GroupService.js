const pool = require("../config/db");
const Group = require("../models/Group");
const GroupMemberService = require("./GroupMemberService");

const GroupService = {
  async createGroup(data) {
    const { name, image_url, created_by, count_member, user_ids = [] } = data;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const result = await pool.query(
        `INSERT INTO groups 
          (name, image_url, created_by, count_member)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [name, image_url, created_by, count_member]
      );
      const group = result.rows[0];

      await client.query(
        `INSERT INTO group_members (user_id, group_id, is_admin)
         VALUES ($1, $2, $3)`,
        [created_by, group.id, true]
      );

      for (const user_id of user_ids) {
        if (user_id !== created_by) {
          await GroupMemberService.addMember({
            user_id,
            group_id: group.id,
            is_admin: false,
          });
        }
      }
  
      await client.query("COMMIT");
      return new Group(group);
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  async editGroup(id, data) {
    const { name, image_url } = data;
  
    const result = await pool.query(
      `UPDATE groups
       SET name = $1,
           image_url = $2
       WHERE id = $3
       RETURNING *`,
      [name, image_url, id]
    );
  
    if (result.rows.length === 0) {
      throw new Error("Group not found or update failed");
    }
  
    return new Group(result.rows[0]);
  },

  async getDetailsGroup(id){
    const result = await pool.query(
      `SELECT g.id, g.name, g.image_url, g.created_by
       FROM groups g
       WHERE g.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error("Group not found");
    }

    return new Group(result.rows[0]);
  }
};

module.exports = GroupService;
