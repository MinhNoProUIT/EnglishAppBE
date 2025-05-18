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
  }
}

module.exports = User;
