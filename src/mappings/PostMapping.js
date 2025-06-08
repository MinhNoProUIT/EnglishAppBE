const {
  PostGetAllVModel,
  PostCreateVModel,
  PostUpdateVModel,
  PostGetTotalVModel,
  PostDataChartVModel,
  PostGetAllByUserVModel,
} = require("../viewmodels/PostVModel");

function mapGetAllPostsToVModel(post) {
  return new PostGetAllVModel(post);
}

function mapGetAllPostsByUserToVModel(post) {
  return new PostGetAllByUserVModel(post);
}

function mapGetTotalPostsToVModel(result) {
  return new PostGetTotalVModel(result);
}

function mapCreatePostToVModel(post) {
  return new PostCreateVModel(post);
}

function mapUpdatePostToVModel(post) {
  return new PostUpdateVModel(post);
}

const mapToPostDataChartVModel = (data) => {
  return data.map(item => new PostDataChartVModel(item));
};


module.exports = {
  mapGetAllPostsToVModel,
  mapGetTotalPostsToVModel,
  mapCreatePostToVModel,
  mapUpdatePostToVModel,
  mapToPostDataChartVModel,
  mapGetAllPostsByUserToVModel,
};
