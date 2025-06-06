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

  async changeNameGroup(id, data) {
    const { name } = data;

    const result = await pool.query(
      `UPDATE groups
       SET name = $1
       WHERE id = $2
       RETURNING *`,
      [name, id]
    );

    if (result.rows.length === 0) {
      throw new Error("Group not found or update failed");
    }

    return new Group(result.rows[0]);
  },

  async changeImageGroup(id, data) {
    const { image_url } = data;

    const result = await pool.query(
      `UPDATE groups
       SET image_url = $1
       WHERE id = $2
       RETURNING *`,
      [image_url, id]
    );

    if (result.rows.length === 0) {
      throw new Error("Group not found or update failed");
    }

    return new Group(result.rows[0]);
  },

  async getDetailsGroup(id) {
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
  },

  async getMonthlyGroupSummary() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let startMonthPrev = currentMonth - 1;
    let startYearPrev = currentYear;
    if (startMonthPrev < 0) {
      startMonthPrev += 12;
      startYearPrev -= 1;
    }

    const startDate = new Date(startYearPrev, startMonthPrev, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    const groups = await prisma.groups.findMany({
      where: {
        created_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        created_date: true,
      },
    });

    const counts = {};

    groups.forEach(({ created_date }) => {
      const year = created_date.getFullYear();
      const month = created_date.getMonth();
      const key = `${year}-${month}`;
      counts[key] = (counts[key] || 0) + 1;
    });

    const currentKey = `${currentYear}-${currentMonth}`;
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;
    if (previousMonth === 0) {
      previousMonth = 11;
      previousYear -= 1;
    }
    const previousKey = `${previousYear}-${previousMonth}`;

    const currentCount = counts[currentKey] || 0;
    const previousCount = counts[previousKey] || 0;

    let changePercent;
    if (previousCount === 0) {
      changePercent = currentCount > 0 ? 100 : 0;
    } else {
      changePercent = ((currentCount - previousCount) / previousCount) * 100;
    }

    return {
      currentMonthCount: currentCount,
      changePercent: Number(changePercent.toFixed(2)),
    };
  },
};

module.exports = GroupService;
