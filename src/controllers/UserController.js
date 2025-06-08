const UserService = require("../services/UserService");
const {
  mapUserToVModel,
  mapUserInPostToVModel,
  mapTopFiveUserInPostToVModel,
} = require("../mappings/UserMapping");
const { Criteria } = require("../viewmodels/CriteriaVModel");
const { getCurrentUserId } = require("../utils/CurrentUser");

const UserController = {
  async getUsers(req, res) {
    try {
      // Lấy các tham số từ query string hoặc body
      const { search, page, rowsPerPage, sortBy, sortOrder } = req.query;

      // Tạo đối tượng Criteria với các tham số từ client
      const criteria = new Criteria({
        search: search || "", // Nếu không có search thì để rỗng
        page: parseInt(page) || 1, // Nếu không có page thì mặc định là trang 1
        rowsPerPage: parseInt(rowsPerPage) || 10, // Nếu không có rowsPerPage thì mặc định là 10
        sortBy: sortBy || "id", // Nếu không có sortBy thì mặc định là "id"
        sortOrder: sortOrder || "ASC", // Nếu không có sortOrder thì mặc định là "ASC"
      });

      // Gọi service để lấy danh sách người dùng
      const result = await UserService.getAllUsers(criteria);

      // Trả kết quả về frontend
      res.json({
        users: result.users.map(mapUserToVModel),
        total: result.total,
      });
    } catch (err) {
      console.error("Error in getAllUsers:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllUserRecommend(req, res) {
    try {
      const result = await UserService.getAllUserRecommend();
      res.json(result.map(mapUserToVModel));
    } catch (err) {
      console.error("Error in get all user recommend:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getLearningList(req, res) {
    try {
      const criteria = {
        search: req.query.search || "",
        page: parseInt(req.query.page) || 0,
        rowsPerPage: parseInt(req.query.rowsPerPage) || 10,
        sortBy: req.query.sortBy || "fullname", // fullname, chuoi, tu, chude
        sortOrder: req.query.sortOrder || "asc", // asc | desc
      };

      const result = await UserService.getLearningList(criteria);
      res.json(result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách học tập:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await UserService.getById(getCurrentUserId(req));

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user);
    } catch (err) {
      console.error("Error in getUserById:", err);

      // Cải thiện thông báo lỗi dựa trên loại lỗi
      if (err.message === "User not found") {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getQuarterlyUserStats(req, res) {
    try {
      const stats = await UserService.getQuarterlyUserStats();
      res.json(stats);
    } catch (err) {
      console.error("Error in getQuarterlyUserStats:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllUsersInPost(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const allUsers = await UserService.getAllUsersInPost(limit, page);
      const total = await UserService.getTotalUsers();

      res.json({
        data: allUsers.map(mapUserInPostToVModel),
        pagination: {
          total,
          page,
          limit,
        },
      });
    } catch (err) {
      console.error("Error in get all users in table post:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async filterUsersInPost(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const keyword = req.query.keyword || "";
      const postRange = req.query.postRange || "all";

      const allUsers = await UserService.filterUsersInPost(
        keyword,
        limit,
        page,
        postRange
      );
      const total = await UserService.countSearchUsers(keyword, postRange);

      res.json({
        data: allUsers.map(mapUserInPostToVModel),
        pagination: {
          total,
          page,
          limit,
        },
      });
    } catch (err) {
      console.error("Error in filter users:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(mapUserToVModel(user));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getTopFiveUserInPost(req, res) {
    try {
      const users = await UserService.getTopFiveUsersInPost();
      res.json(users.map(mapTopFiveUserInPostToVModel));
    } catch (err) {
      console.error("Error in getAllUsers:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async updateUser(req, res) {
    const userId = req.params.id;
    const newData = req.body;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "english-app");
      req.body.image_url = result.secure_url;
    }

    req.body.gender = req.body.gender === "true"; // Nếu "true", chuyển thành true, còn "false" chuyển thành false

    try {
      const result = await UserService.updateUser(
        userId,
        newData,
        getCurrentUserId(req)
      );
      res.json(result);
    } catch (err) {
      console.error("Lỗi cập nhật user:", err);
      if (err.message.includes("không tồn tại")) {
        return res.status(404).json({ error: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  },

  async blockUser(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.blockUser(id);
      res
        .status(200)
        .json({ message: "user blocked successfully", data: user });
    } catch (err) {
      console.error("Error in block", err);
      res.status(400).json({ message: err.message });
    }
  },

  async removeUser(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.removeUser(id);
      res
        .status(200)
        .json({ message: "user removed successfully", data: user });
    } catch (err) {
      console.error("Error in remove user", err);
      res.status(400).json({ message: err.message });
    }
  },

  async getLongestAndShortestStreak(req, res) {
    try {
      const result = await UserService.getLongestAndShortestStreak();
      console.log(result);
      if (!result.longestFullname || !result.shortestFullname) {
        return res.status(404).json({ error: "No attendance records found" });
      }

      res.json(result);
    } catch (err) {
      console.error("Error in getLongestAndShortestStreakHandler:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getTopFiveLearning(req, res) {
    try {
      const data = await UserService.getTopFiveLearning();
      res.json(data);
    } catch (err) {
      res.status(500).json({ err: "Internal Server Error", details: err });
    }
  },
  async getTopLearnedTopics(req, res) {
    try {
      const data = await UserService.getTopSevenTopic();
      res.status(200).json(data);
    } catch (error) {
      console.error("Lỗi khi truy vấn top topic:", error); // ← thêm dòng này
      res.status(500).json({
        error: "Internal Server Error",
        details: error,
      });
    }
  },

  async upgradeToPremium(req, res) {
    try {
      const user_id = await getCurrentUserId(req);
      const message = await UserService.upgradeToPremium(user_id);
      return res.status(200).json({ message });
    } catch (err) {
      return res.status(400).json({ error: error.message });
    }
  },
};

module.exports = UserController;
