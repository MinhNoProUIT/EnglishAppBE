require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/users", async (req, res) => {
  console.log("🔹 Received request to /users");
  console.log("🔹 Request body:", req.body);

  const { username, passwordhash, email } = req.body;

  if (!username || !passwordhash || !email) {
    console.log("Missing required fields!");
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const emailCheck = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (emailCheck.rows.length > 0) {
      console.log("Lỗi: Email đã tồn tại!");
      return res.status(400).json({ error: "Email already exists" });
    }

    const result = await pool.query(
      "INSERT INTO users (username, email, passwordhash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, passwordhash]
    );

    console.log("User added successfully:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Database Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
