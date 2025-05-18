class UserErrorReport {
  constructor({ id, user_id, post_id, title, content, created_date, status }) {
    this.id = id;
    this.user_id = user_id;
    this.post_id = post_id;
    this.title = title;
    this.content = content;
    this.created_date = created_date;
    this.status = status;
  }
}

module.exports = UserErrorReport;
