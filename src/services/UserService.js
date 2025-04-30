const pool = require("../config/db");
const User = require("../models/User");

const UserService = {
  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows.map((row) => new User(row));
  },

  async createUser(data) {
    const {
      username,
      email,
      password,
      phoneNumber,
      birthday,
      gender,
      fullName,
      address,
      isActive = true,
      isAdmin = false,
      balance = 0,
    } = data;

    const result = await pool.query(
      `INSERT INTO users 
        (username, email, passwordhash, phonenumber, birthday, gender, fullname, address, isactive, isadmin, balance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        username,
        email,
        password,
        phoneNumber,
        birthday,
        gender,
        fullName,
        address,
        isActive,
        isAdmin,
        balance,
      ]
    );

    return new User(result.rows[0]);
  },
};

module.exports = UserService;
