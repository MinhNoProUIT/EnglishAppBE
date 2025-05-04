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
    passwordhash,
    phonenumber,
    birthday,
    gender,
    fullname,
    address,
    isactive = true,
    isadmin = false,
    balance = 0,
  }) {
    this.username = username;
    this.email = email;
    this.passwordhash = passwordhash;
    this.phonenumber = phonenumber;
    this.birthday = birthday;
    this.gender = gender;
    this.fullname = fullname;
    this.address = address;
    this.isactive = isactive;
    this.isadmin = isadmin;
    this.balance = balance;
  }
}

class UserUpdateVModel {
  constructor({
    id,
    username,
    email,
    phonenumber,
    birthday,
    gender,
    fullname,
    address,
    isactive,
    isadmin,
    balance,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phonenumber = phonenumber;
    this.birthday = birthday;
    this.gender = gender;
    this.fullname = fullname;
    this.address = address;
    this.isactive = isactive;
    this.isadmin = isadmin;
    this.balance = balance;
  }
}

class UserGetAllVModel {
  constructor({
    id,
    username,
    email,
    fullname,
    birthday,
    gender,
    address,
    phonenumber,
    createddate,
    isactive,
    isadmin,
    balance,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
    this.phonenumber = phonenumber;
    this.createddate = createddate;
    this.isactive = isactive;
    this.isadmin = isadmin;
    this.balance = balance;
  }
}

module.exports = {
  CredentialsVModel,
  UserCreateVModel,
  UserUpdateVModel,
  UserGetAllVModel,
};
