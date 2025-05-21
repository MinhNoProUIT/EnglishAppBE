class sharedPostCreateVModel {
  constructor({
    id,
    post_id,
    user_id,
    shared_post_id,
    react_count = 0,
    comment_count = 0,
    shared_count = 0,
    content,
  }) {
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.shared_post_id = shared_post_id;
    this.react_count = react_count;
    this.comment_count = comment_count;
    this.shared_count = shared_count;
    this.content = content;
  }
}

class getAllSharedPostVModel {
  constructor({
    id,
    author_id,
    author_name,
    author_image_url,
    user_shared_id,
    user_shared_name,
    user_shared_image_url,
    react_count,
    content,
    created_date,
    image_url,
    shared_count,
    comment_count,
  }) {
    this.id = id;
    this.author_id = author_id;
    this.author_name = author_name;
    this.author_image_url = author_image_url;
    this.user_shared_id = user_shared_id;
    this.user_shared_name = user_shared_name;
    this.user_shared_image_url = user_shared_image_url;
    this.react_count = react_count;
    this.content = content;
    this.created_date = created_date;
    this.image_url = image_url;
    this.shared_count = shared_count;
    this.comment_count = comment_count;
  }
}

module.exports = {
  sharedPostCreateVModel,
  getAllSharedPostVModel,
};
