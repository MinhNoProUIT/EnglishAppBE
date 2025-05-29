function getCurrentUserId(req) {
  if (!req.user || !req.user.userId) {
    throw new Error("Người dùng chưa đăng nhập");
  }
  return req.user.userId;
}

function isCurrentUserAdmin(req) {
  return req.user?.isAdmin === true;
}

module.exports = {
  getCurrentUserId,
  isCurrentUserAdmin,
};
