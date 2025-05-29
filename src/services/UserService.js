const pool = require("../config/db");
const User = require("../models/User");
const {
  BlockUserVModel,
  UserUpdateVModel,
  RemoveUserVModel,
} = require("../viewmodels/UserVModel");

const safeBool = (val, def = false) => {
  if (typeof val === "boolean") return val;
  if (typeof val === "string") {
    const lower = val.toLowerCase();
    if (lower === "true") return true;
    if (lower === "false") return false;
  }
  return def;
};

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
      firebase_uid,
      isVerified,
      isActive = true,
      isAdmin = false,
      balance = 0,
    } = data;

    const res = await pool.query(
      `INSERT INTO users (username, email, passwordhash, firebase_uid, is_verified, isactive, isadmin, balance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        username,
        email,
        passwordhash,
        firebase_uid,
        isVerified,
        isActive,
        isAdmin,
        balance,
      ]
    );

    return res.rows[0];
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
  async updateUser(id, data) {
    const {
      username,
      email,
      phonenumber,
      birthday,
      gender,
      fullname,
      address,
      image_url,
    } = data;

    // Bước 1: Kiểm tra người dùng có tồn tại không
    const check = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (check.rows.length === 0) {
      throw new Error("User not found");
    }

    // Bước 2: Tiến hành cập nhật
    const result = await pool.query(
      `UPDATE users
      SET
        username = $1,
        email = $2,
        phonenumber = $3,
        birthday = $4,
        gender = $5,
        fullname = $6,
        address = $7,
        image_url = $8
      WHERE id = $9
      RETURNING *`,
      [
        username,
        email,
        phonenumber,
        birthday,
        gender,
        fullname,
        address,
        image_url,
        id,
      ]
    );

    return new UserUpdateVModel(result.rows[0]);
  },
  async blockUser(id) {
    const check = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (check.rows.length === 0) {
      throw new Error("User not found");
    }

    const currentStatus = check.rows[0].is_block;
    const newStatus = !currentStatus;

    const result = await pool.query(
      `UPDATE users
       SET is_block = $1
       WHERE id = $2
       RETURNING *`,
      [newStatus, id]
    );

    return new BlockUserVModel(result.rows[0]);
  },

  async removeUser(id) {
    const check = await pool.query(`select * from users where id = $1`, [id]);
    if (check.rows.length === 0) {
      throw new Error("User not found");
    }

    const currentStatus = check.rows[0].isActive;
    const newStatus = !currentStatus;

    const result = await pool.query(
      `UPDATE users
       SET isactive = false
       WHERE id = $2
       RETURNING *`,
      [newStatus, id]
    );

    return new RemoveUserVModel(result);
  },
  async findUserByUsername(username) {
    const check = await pool.query(`select * from users where username = $1`, [
      username,
    ]);
    if (check.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
  async findUserByEmail(email) {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (result.rows.length === 0) {
      return null; // hoặc undefined
    }
    return result.rows[0]; // Trả về user object
  },
  async findUserByUserId(userId) {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);
    if (result.rows.length === 0) {
      return null; // hoặc undefined
    }
    return result.rows[0]; // Trả về user object
  },
};

module.exports = UserService;
