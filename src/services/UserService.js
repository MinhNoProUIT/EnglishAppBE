const pool = require("../config/db");
const User = require("../models/User");

const UserService = {
  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows.map((row) => new User(row));
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
