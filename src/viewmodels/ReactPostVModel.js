class getTotalReactPostVModel {
  constructor({ total_react_post }) {
    this.total_react_post = total_react_post;
  }
}

class createReacPostVModel {
  constructor({ post_id, user_id, created_date }) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.created_date = created_date;
  }
}

module.exports = {
  getTotalReactPostVModel,
  createReacPostVModel,
};
