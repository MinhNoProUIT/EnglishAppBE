class ReactPost {
  constructor({ id, post_id, user_id, created_date }) {
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.created_date = created_date;
  }
}

module.exports = ReactPost;
