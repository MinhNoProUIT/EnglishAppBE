class Post {
  constructor({
    id,
    user_id,
    react_count,
    content,
    created_date,
    image_url,
    shared_user_id_count,
    comment_count,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.react_count = react_count;
    this.content = content;
    this.created_date = created_date;
    this.image_url = image_url;
    this.shared_user_id_count = shared_user_id_count;
    this.comment_count = comment_count;
  }
}

module.exports = Post;
