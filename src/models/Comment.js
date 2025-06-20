class Comment {
  constructor({
    id,
    post_id,
    user_id,
    react_count,
    content,
    parent_comment,
    root_comment,
    shared_post_id,
    created_date,
  }) {
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.react_count = react_count;
    this.content = content;
    this.parent_comment = parent_comment;
    this.root_comment = root_comment;
    this.shared_post_id = shared_post_id;
    this.created_date = created_date;
  }
}

module.exports = Comment;
