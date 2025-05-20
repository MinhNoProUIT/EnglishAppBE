class getAllCommentsByPostVModel {
  constructor({
    id,
    post_id,
    user_id,
    react_count,
    content,
    parent_comment,
    root_comment,
    author_name,
    author_image,
    username_parent,
    username_root,
    created_date,
  }) {
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.react_count = react_count;
    this.content = content;
    this.parent_comment = parent_comment;
    this.root_comment = root_comment;
    this.author_name = author_name;
    this.author_image = author_image;
    this.username_parent = username_parent;
    this.username_root = username_root;
    this.created_date = created_date;
  }
}

class createCommentVModel {
  constructor({
    post_id,
    user_id,
    react_count,
    content,
    parent_comment = null,
    root_comment = null,
    created_date,
  }) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.react_count = react_count;
    this.content = content;
    this.parent_comment = parent_comment;
    this.root_comment = root_comment;
    this.created_date = created_date;
  }
}

class editCommentVModel {
  constructor({
    id,
    react_count,
    content,
    parent_comment = null,
    root_comment = null,
  }) {
    this.id = id;
    this.react_count = react_count;
    this.content = content;
    this.parent_comment = parent_comment;
    this.root_comment = root_comment;
  }
}

module.exports = {
  getAllCommentsByPostVModel,
  createCommentVModel,
  editCommentVModel,
};
