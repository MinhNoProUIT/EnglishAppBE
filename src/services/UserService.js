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
const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

function getQuarter(date) {
  return Math.floor(date.getMonth() / 3) + 1;
}

const UserService = {
  async getAllUsers(criteria) {
    const { search, page, rowsPerPage, sortBy, sortOrder } = criteria;
    let where = {
      isactive: true, // ✅ lọc user đang hoạt động
    };

    if (search) {
      where.OR = [
        { username: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { fullname: { contains: search, mode: "insensitive" } },
      ];
    }

    const validSortColumn = ["id", "username", "email"];
    const sortColumn = validSortColumn.includes(sortBy) ? sortBy : "id";
    const sortDirection = sortOrder.toUpperCase() === "DESC" ? "desc" : "asc";

    const skip = (page - 1) * rowsPerPage;
    const take = rowsPerPage;

    const users = await prisma.users.findMany({
      where,
      orderBy: {
        [sortColumn]: sortDirection,
      },
      skip,
      take,
    });

    const totalUsers = await prisma.users.count({
      where,
    });
    return {
      users,
      totalUsers,
    };
  },

  async getAllUserRecommend() {
    try {
      const result = await pool.query(`SELECT * FROM users`);
      return result.rows;
    } catch (error) {
      console.error("Error in getAllUserRecommend:", error);
      throw new Error("Could not fetch users");
    }
  },

  async getLearningList(criteria) {
    const {
      search,
      page = 1,
      rowsPerPage = 10,
      sortBy = "fullname", // "fullname" | "chuoi" | "tu" | "chude"
      sortOrder = "asc", // "asc" | "desc" (case-insensitive)
    } = criteria;

    const sortOrderNormalized = sortOrder.toLowerCase();

    // Tìm theo tên nếu có
    const where = {
      isactive: true,
      ...(search && {
        fullname: {
          contains: search,
          mode: "insensitive",
        },
      }),
    };

    // Lấy danh sách users (chỉ sắp xếp bằng Prisma nếu là fullname)
    const users = await prisma.users.findMany({
      where,
      skip: (page - 1) * rowsPerPage,
      take: rowsPerPage,
      orderBy:
        sortBy === "fullname" ? { fullname: sortOrderNormalized } : undefined,
      select: {
        id: true,
        fullname: true,
        image_url: true,
      },
    });

    const userIds = users.map((u) => u.id);

    // Lấy chuỗi, chủ đề, từ đã học
    const [attendanceCounts, topicCounts, wordCounts] = await Promise.all([
      prisma.attendance.groupBy({
        by: ["user_id"],
        where: { user_id: { in: userIds } },
        _count: true,
      }),
      prisma.user_courses.groupBy({
        by: ["user_id"],
        where: { user_id: { in: userIds } },
        _count: true,
      }),
      prisma.user_progress.groupBy({
        by: ["user_id"],
        where: { user_id: { in: userIds } },
        _count: true,
      }),
    ]);

    // Tổng hợp dữ liệu
    const result = users.map((user) => {
      const chuoi =
        attendanceCounts.find((a) => a.user_id === user.id)?._count || 0;
      const chude = topicCounts.find((t) => t.user_id === user.id)?._count || 0;
      const tu = wordCounts.find((w) => w.user_id === user.id)?._count || 0;

      return {
        fullname: user.fullname,
        image_url: user.image_url,
        chuoi,
        tu,
        chude,
      };
    });

    // Nếu sắp xếp theo chuoi/tu/chude thì sort thủ công
    if (sortBy !== "fullname") {
      result.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        return sortOrderNormalized === "asc" ? valA - valB : valB - valA;
      });
    }

    return result;
  },

  async getById(id) {
    try {
      const user = await prisma.users.findFirst({
        where: { id: id },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return new UserUpdateVModel(user);
    } catch (err) {
      console.error("Error in getById:", err);
      if (err instanceof PrismaClientValidationError) {
        // Xử lý lỗi riêng cho Prisma nếu cần
        throw new Error("Invalid query");
      }
      throw new Error("Internal server error"); // Trả lại lỗi chung nếu không phải Prisma lỗi
    }
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

    users.forEach(({ created_date }) => {
      const year = created_date.getFullYear();
      const quarter = getQuarter(created_date);
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
  async updateUser(userId, newData, changedBy) {
    return await prisma.$transaction(async (tx) => {
      // Lấy dữ liệu cũ
      const oldUser = await tx.users.findFirst({
        where: { id: userId },
      });

      if (!oldUser) {
        throw new Error("Người dùng không tồn tại");
      }

      // Ép kiểu birthday nếu có
      if (newData.birthday) {
        try {
          newData.birthday = new Date(newData.birthday);
          if (isNaN(newData.birthday.getTime())) {
            throw new Error("Ngày sinh không đúng định dạng");
          }
        } catch (e) {
          throw new Error("Ngày sinh không hợp lệ");
        }
      }

      // Cập nhật user
      const updatedUser = await tx.users.update({
        where: { id: userId },
        data: newData,
      });

      // Ghi lịch sử cập nhật
      await tx.user_profile_history.create({
        data: {
          user_id: userId,
          changed_by: changedBy,
          old_data: oldUser,
          new_data: updatedUser,
        },
      });

      return updatedUser;
    });
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

  async getUserById(user_id) {
    try {
      // Truy vấn người dùng từ cơ sở dữ liệu dựa trên user_id
      const user = await prisma.users.findFirst({
        where: {
          id: user_id, // Tìm theo user_id
        },
      });

      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }

      return user;
    } catch (error) {
      throw new Error("Lỗi khi truy vấn người dùng: " + error.message);
    }
  },

  async updatePassword(userId, newHashedPassword) {
    try {
      const user = await prisma.users.update({
        where: { id: userId }, // Tìm người dùng theo userId
        data: {
          passwordhash: newHashedPassword, // Cập nhật mật khẩu đã mã hóa
        },
      });
      return user; // Trả về thông tin người dùng sau khi cập nhật mật khẩu
    } catch (error) {
      throw new Error("Không thể cập nhật mật khẩu: " + error.message);
    }
  },

  async getLongestAndShortestStreak() {
    try {
      const records = await prisma.attendance.findMany({
        orderBy: [{ user_id: "asc" }, { created_date: "asc" }],
      });

      const streaks = {};
      let currentUserId = null;
      let countStreak = 0;

      // Duyệt qua tất cả các bản ghi
      records.forEach((record, index) => {
        if (record.user_id !== currentUserId) {
          if (currentUserId !== null) {
            // Đảm bảo mảng streaks[currentUserId] đã được khởi tạo
            streaks[currentUserId] = streaks[currentUserId] || [];
            streaks[currentUserId].push(countStreak);
          }
          currentUserId = record.user_id;
          countStreak = 1;
        } else {
          const prevRecord = records[index - 1];
          const dayDiff =
            (new Date(record.created_date) -
              new Date(prevRecord.created_date)) /
            (1000 * 3600 * 24);

          if (dayDiff === 1) {
            countStreak++;
          } else {
            // Đảm bảo mảng streaks[currentUserId] đã được khởi tạo
            streaks[currentUserId] = streaks[currentUserId] || [];
            streaks[currentUserId].push(countStreak);
            countStreak = 1;
          }
        }
      });

      // Đảm bảo mảng streaks[currentUserId] đã được khởi tạo cho lần cuối
      if (currentUserId !== null) {
        streaks[currentUserId] = streaks[currentUserId] || [];
        streaks[currentUserId].push(countStreak);
      }

      let longestUserId = null;
      let shortestUserId = null;
      let longestStreak = 0;
      let shortestStreak = Infinity;

      // Duyệt qua các userId và tính toán longest và shortest streak
      for (const userId in streaks) {
        if (streaks[userId].length > 0) {
          const maxStreak = Math.max(...streaks[userId]);
          const minStreak = Math.min(...streaks[userId]);

          if (maxStreak > longestStreak) {
            longestStreak = maxStreak;
            longestUserId = userId;
          }

          if (minStreak < shortestStreak) {
            shortestStreak = minStreak;
            shortestUserId = userId;
          }
        }
      }

      // Lấy thông tin người dùng với longest và shortest streak
      const longestUser = await prisma.users.findFirst({
        where: { id: longestUserId },
      });

      const shortestUser = await prisma.users.findFirst({
        where: { id: shortestUserId },
      });

      return {
        longestFullname: longestUser?.fullname ?? "N/A",
        longestStreak,
        shortestFullname: shortestUser?.fullname ?? "N/A",
        shortestStreak,
      };
    } catch (err) {
      console.error("Error in getLongestAndShortestStreak:", err);
      throw new Error("Failed to fetch streak data");
    }
  },

  async getTopSevenTopic() {
    const rawResults = await prisma.$queryRawUnsafe(`
      SELECT t.title, COUNT(sat.course_id) AS access_count
      FROM user_courses sat
      JOIN courses t ON sat.course_id = t.id
      GROUP BY t.title
      ORDER BY access_count DESC
      LIMIT 7;
    `);

    return rawResults.map((item) => ({
      name: item.name,
      accessCount: Number(item.access_count),
    }));
  },

  async getTopFiveLearning() {
    const result = await prisma.user_progress.groupBy({
      by: ["user_id"],
      _count: { word_id: true },
    });

    const enriched = await Promise.all(
      result.map(async (item) => {
        const user = await prisma.users.findFirst({
          where: { id: item.user_id },
          select: { fullname: true },
        });
        return {
          fullname: user?.fullname || "unknown",
          wordCount: item._count.word_id,
        };
      })
    );
    return enriched.sort((a, b) => b.wordCount - a.wordCount).slice(0, 5);
  },

  async upgradeToPremium(user_id) {
    const user = await prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isPremium) {
      await prisma.users.update({
        where: { id: user_id },
        data: { isPremium: true },
      });
      return true;
    }
  },
};

module.exports = UserService;
