class RegisterViewModel {
  constructor(email, password, confirmPassword, username) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.username = username;
  }
}

class LoginRequest {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class ChangePasswordRequest {
  constructor(oldPassword, newPassword) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}

module.exports = { RegisterViewModel, LoginRequest, ChangePasswordRequest };
