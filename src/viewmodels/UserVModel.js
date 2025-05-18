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
    image_url,
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
    this.image_url = image_url;
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
    image_url,
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
    this.image_url = image_url;
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
    image_url,
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
    this.image_url = image_url;
    this.phonenumber = phonenumber;
    this.createddate = createddate;
    this.isactive = isactive;
    this.isadmin = isadmin;
    this.balance = balance;
  }
}

class UserGetAllInPostVModel {
  constructor({
    id,
    username,
    image_url,
    total_posts,
    total_react_count,
    total_shared_count,
  }) {
    this.id = id;
    this.username = username;
    this.image_url = image_url;
    this.total_posts = total_posts;
    this.total_react_count = total_react_count;
    this.total_shared_count = total_shared_count;
  }
}

class TopFiveUserInPostVModel {
  constructor({
    id,
    username,
    image_url,
    total_posts,
  }) {
    this.id = id;
    this.username = username;
    this.image_url = image_url;
    this.total_posts = total_posts;
  }
}

module.exports = {
  CredentialsVModel,
  UserCreateVModel,
  UserUpdateVModel,
  UserGetAllVModel,
  UserGetAllInPostVModel,
  TopFiveUserInPostVModel,
};
