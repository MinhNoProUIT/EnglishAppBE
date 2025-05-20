class getAllReactCommentsByPostVModel {
  constructor({ comment_id, react_count }) {
    this.comment_id = comment_id;
    this.react_count = react_count;
  }
}

class createReactCommentVModel {
  constructor({ comment_id, user_id, react_count, created_date }) {
    this.comment_id = comment_id;
    this.user_id = user_id;
    this.react_count = react_count;
    this.created_date = created_date;
  }
}

module.exports = {
  getAllReactCommentsByPostVModel,
  createReactCommentVModel,
};
