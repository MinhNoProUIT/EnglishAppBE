class getAllGroupByUserVModel {
  constructor({
    id,
    name,
    image_url,
    last_message,
    last_time_message,
    total_message_unseen,
  }) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
    this.last_message = last_message;
    this.last_time_message = last_time_message;
    this.total_message_unseen = total_message_unseen;
  }
}

class createGroupVModel {
  constructor({ name, image_url, created_by, count_member, created_date }) {
    this.name = name;
    this.image_url = image_url;
    this.created_by = created_by;
    this.count_member = count_member;
    this.created_date = created_date;
  }
}

class editGroupVModel {
  constructor({ id, name, image_url }) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
  }
}

module.exports = {
  getAllGroupByUserVModel,
  createGroupVModel,
  editGroupVModel,
};
