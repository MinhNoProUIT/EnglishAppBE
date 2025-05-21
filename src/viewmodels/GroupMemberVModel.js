class getAllMemberInGroupVModel {
  constructor({ id, user_id, username, image_url, is_admin }) {
    this.id = id;
    this.user_id = user_id;
    this.username = username;
    this.image_url = image_url;
    this.is_admin = is_admin;
  }
}

class getAllGroupByUserVModel {
  constructor({
    id,
    group_name,
    group_image_url,
    last_username,
    last_message,
    last_time_message,
  }) {
    this.id = id;
    this.group_name = group_name;
    this.group_image_url = group_image_url;
    this.last_username = last_username;
    this.last_message = last_message;
    this.last_time_message = last_time_message;
  }
}

class addMemberVModel {
  constructor({ user_id, group_id, is_admin, joined_date }) {
    this.user_id = user_id;
    this.group_id = group_id;
    this.is_admin = is_admin;
    this.joined_date = joined_date;
  }
}

class kickMemberVModel {
  constructor({ id }) {
    this.id = id;
  }
}

module.exports = {
  getAllMemberInGroupVModel,
  getAllGroupByUserVModel,
  addMemberVModel,
  kickMemberVModel,
};
