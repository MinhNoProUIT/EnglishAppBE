const {
  getAllReactCommentsByPostVModel,
  createReactCommentVModel,
} = require("../viewmodels/ReactCommentVModel");

function mapGetAllReactCommentsByPostToVModel(comments) {
  return new getAllReactCommentsByPostVModel(comments);
}

function mapCreateReactCommentToVModel(comment) {
  return new createReactCommentVModel(comment);
}

module.exports = {
  mapGetAllReactCommentsByPostToVModel,
  mapCreateReactCommentToVModel,
};
