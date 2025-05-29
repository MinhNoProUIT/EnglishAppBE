class User {
  constructor({
    id,
    username,
    passwordhash,
    birthday,
    gender,
    fullname,
    address,
    email,
    image_url,
    phonenumber,
    createddate,
    isactive,
    isadmin,
    balance,
    is_block,
    is_verified,
    firebase_uid,
  }) {
    this.id = id;
    this.username = username;
    this.passwordhash = passwordhash;
    this.birthday = birthday;
    this.gender = gender;
    this.fullname = fullname;
    this.address = address;
    this.email = email;
    this.phonenumber = phonenumber;
    this.image_url = image_url;
    this.createddate = createddate;
    this.isactive = isactive;
    this.isadmin = isadmin;
    this.balance = balance;
    this.is_block = is_block;
    this.is_verified = is_verified;
    this.firebase_uid = firebase_uid;
  }
}

module.exports = User;
