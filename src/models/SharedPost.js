class SharedPost {
  constructor({
    id,
    post_id,
    user_id,
    shared_post_id,
    react_count,
    comment_count,
    shared_count,
    content,
    created_date,
  }) {
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.shared_post_id = shared_post_id;
    this.react_count = react_count;
    this.comment_count = comment_count;
    this.shared_count = shared_count;
    this.content = content;
    this.created_date = created_date;
  }
}

module.exports = SharedPost;
