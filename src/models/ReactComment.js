class ReactComment {
  constructor({ id, comment_id, user_id, created_date }) {
    this.id = id;
    this.comment_id = comment_id;
    this.user_id = user_id;
    this.created_date = created_date;
  }
}

module.exports = ReactComment;
