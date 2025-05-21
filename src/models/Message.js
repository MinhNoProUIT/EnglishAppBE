class Message {
  constructor({ id, sender_id, group_id, content, created_at }) {
    this.id = id;
    this.sender_id = sender_id;
    this.group_id = group_id;
    this.content = content;
    this.created_at = created_at;
  }
}

module.exports = Message;
