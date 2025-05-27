const pool = require("../config/db");
const User = require("../models/User");
const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

function getQuarter(date) {
  return Math.floor(date.getMonth() / 3) + 1;
}

const UserService = {
  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows.map((row) => new User(row));
  },

  async getQuarterlyUserStats() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentQuarter = getQuarter(now);

    let startMonthPrevQuarter = (currentQuarter - 2) * 3;
    let startYearPrevQuarter = currentYear;
    if (startMonthPrevQuarter < 0) {
      startMonthPrevQuarter += 12;
      startYearPrevQuarter -= 1;
    }

    const startDate = new Date(startYearPrevQuarter, startMonthPrevQuarter, 1);
    const endDate = new Date(currentYear, currentQuarter * 3, 0, 23, 59, 59);

    const users = await prisma.users.findMany({
      where: {
        createddate: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        createddate: true,
      },
    });

    const counts = {};

    users.forEach(({ createddate }) => {
      const year = createddate.getFullYear();
      const quarter = getQuarter(createddate);
      const key = `${year}-Q${quarter}`;
      counts[key] = (counts[key] || 0) + 1;
    });

    const currentKey = `${currentYear}-Q${currentQuarter}`;
    let previousQuarter = currentQuarter - 1;
    let previousYear = currentYear;
    if (previousQuarter === 0) {
      previousQuarter = 4;
      previousYear -= 1;
    }
    const previousKey = `${previousYear}-Q${previousQuarter}`;

    const currentCount = counts[currentKey] || 0;
    const previousCount = counts[previousKey] || 0;

    let changePercent;
    if (previousCount === 0) {
      changePercent = currentCount > 0 ? 100 : 0;
    } else {
      changePercent = ((currentCount - previousCount) / previousCount) * 100;
    }

    return {
      currentQuarterCount: currentCount,
      changePercent: Number(changePercent.toFixed(2)),
    };
  },

  async getAllUsersInPost(limit = 5, page = 1) {
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `
      SELECT 
        u.*,
        COUNT(p.id) AS total_posts,
        SUM(p.react_count) AS total_react_count,
        SUM(p.shared_user_id_count) AS total_shared_count
      FROM users u
      JOIN posts p ON u.id = p.user_id
      GROUP BY u.id
      LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );
    return result.rows;
  },

  async getTotalUsers() {
    const result = await pool.query("SELECT COUNT(*) FROM users");
    return result.rowCount;
  },

  async filterUsersInPost(keyword, limit, page, postRange = "all") {
    const offset = (page - 1) * limit;

    let havingClause = "";
    switch (postRange) {
      case "lt10":
        havingClause = "HAVING COUNT(p.id) < 10";
        break;
      case "from10to30":
        havingClause = "HAVING COUNT(p.id) BETWEEN 10 AND 30";
        break;
      case "gt30":
        havingClause = "HAVING COUNT(p.id) > 30";
        break;
      case "all":
      default:
        havingClause = "";
        break;
    }

    const result = await pool.query(
      `
      SELECT 
        u.*,
        COUNT(p.id) AS total_posts,
        SUM(p.react_count) AS total_react_count,
        SUM(p.shared_user_id_count) AS total_shared_count
      FROM users u
      JOIN posts p ON u.id = p.user_id
      WHERE u.username ILIKE $1
      GROUP BY u.id
      ${havingClause}
      LIMIT $2 OFFSET $3
      `,
      [`%${keyword}%`, limit, offset]
    );

    return result.rows;
  },

  async countSearchUsers(keyword, postRange = "all") {
    let havingClause = "";
    switch (postRange) {
      case "lt10":
        havingClause = "HAVING COUNT(p.id) < 10";
        break;
      case "from10to30":
        havingClause = "HAVING COUNT(p.id) BETWEEN 10 AND 30";
        break;
      case "gt30":
        havingClause = "HAVING COUNT(p.id) > 30";
        break;
      case "all":
      default:
        havingClause = "";
        break;
    }
    const result = await pool.query(
      `
      SELECT COUNT(*) FROM (
        SELECT u.id
        FROM users u
        JOIN posts p ON u.id = p.user_id
        WHERE u.username ILIKE $1
        GROUP BY u.id
        ${havingClause}
      ) AS subquery
      `,
      [`%${keyword}%`]
    );
    return parseInt(result.rows[0].count);
  },

  async createUser(data) {
    const {
      username,
      email,
      passwordhash,
      phoneNumber,
      birthday,
      gender,
      fullName,
      address,
      image_url,
      isActive = true,
      isAdmin = false,
      balance = 0,
    } = data;

    const result = await pool.query(
      `INSERT INTO users 
        (username, email, passwordhash, phonenumber, birthday, gender, fullname, address, isactive, isadmin, balance, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        username,
        email,
        passwordhash,
        phoneNumber,
        birthday,
        gender,
        fullName,
        address,
        image_url,
        isActive,
        isAdmin,
        balance,
      ]
    );

    return new User(result.rows[0]);
  },

  async getTopFiveUsersInPost() {
    const result = await pool.query(
      `
      SELECT 
        u.id,
        u.username,
        u.image_url,
        COUNT(p.id) AS total_posts
      FROM users u
      JOIN posts p ON u.id = p.user_id
      GROUP BY u.id, u.username, u.image_url
      ORDER BY total_posts DESC
      LIMIT 5
      `
    );
    return result.rows;
  },
};

module.exports = UserService;
