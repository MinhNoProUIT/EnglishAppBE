const {
  sharedPostCreateVModel,
  getAllSharedPostVModel,
} = require("../viewmodels/SharedPostVModel");

function mapSharedPostCreateToVModel(sharedPost) {
  return new sharedPostCreateVModel(sharedPost);
}

function mapGetAllSharedPostToVModel(sharedPosts) {
  return new getAllSharedPostVModel(sharedPosts);
}

module.exports = {
  mapSharedPostCreateToVModel,
  mapGetAllSharedPostToVModel,
};
