// middlewares/checkPermission.js

/**
 * Middleware phân quyền động: chỉ cho phép người có vai trò nhất định.
 * @param {"admin" | "user"} requiredRole - vai trò được phép truy cập
 */
const checkPermission = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const isAdmin = req.user.isAdmin === true;

    if (requiredRole === "admin" && !isAdmin) {
      return res.status(403).json({ message: "Bạn không có quyền admin" });
    }

    if (requiredRole === "user" && isAdmin) {
      return res
        .status(403)
        .json({ message: "Admin không được phép truy cập API này" });
    }

    next();
  };
};

module.exports = checkPermission;
