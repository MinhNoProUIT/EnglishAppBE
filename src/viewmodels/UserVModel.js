class CredentialsVModel {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

class UserCreateVModel {
  constructor({
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
  }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.birthday = birthday;
    this.gender = gender;
    this.fullName = fullName;
    this.address = address;
    this.isActive = isActive;
    this.isAdmin = isAdmin;
    this.balance = balance;
  }
}

class UserUpdateVModel {
  constructor({
    id,
    username,
    email,
    phoneNumber,
    birthday,
    gender,
    fullName,
    address,
    isActive,
    isAdmin,
    balance,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.birthday = birthday;
    this.gender = gender;
    this.fullName = fullName;
    this.address = address;
    this.isActive = isActive;
    this.isAdmin = isAdmin;
    this.balance = balance;
  }
}

class UserGetAllVModel {
  constructor({
    id,
    username,
    email,
    fullName,
    birthday,
    gender,
    address,
    phoneNumber,
    createdDate,
    isActive,
    isAdmin,
    balance,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.createdDate = createdDate;
    this.isActive = isActive;
    this.isAdmin = isAdmin;
    this.balance = balance;
  }
}

module.exports = {
  CredentialsVModel,
  UserCreateVModel,
  UserUpdateVModel,
  UserGetAllVModel,
};
