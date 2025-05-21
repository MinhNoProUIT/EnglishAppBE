class getAllMessagesInGroupVModel {
  constructor({
    id,
    sender_id,
    sender_username,
    sender_image_url,
    content,
    created_date,
  }) {
    this.id = id;
    this.sender_id = sender_id;
    this.sender_username = sender_username;
    this.sender_image_url = sender_image_url;
    this.content = content;
    this.created_date = created_date;
  }
}

class createMessageVModel {
  constructor({ sender_id, group_id, content }) {
    this.sender_id = sender_id;
    this.group_id = group_id;
    this.content = content;
  }
}

module.exports = {
  getAllMessagesInGroupVModel,
  createMessageVModel,
};
