const {
  createCommentVModel,
  getAllCommentsByPostVModel,
  editCommentVModel,
} = require("../viewmodels/CommentVModel");

function mapGetAllCommentsByPostToVModel(comments) {
  return new getAllCommentsByPostVModel(comments);
}

function mapCreateCommentsToVModel(comment) {
  return new createCommentVModel(comment);
}

function mapEditCommentToVModel(comment) {
  return new editCommentVModel(comment);
}

module.exports = {
  mapGetAllCommentsByPostToVModel,
  mapCreateCommentsToVModel,
  mapEditCommentToVModel,
};
