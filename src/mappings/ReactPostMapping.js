const {
  getTotalReactPostVModel,
  createReacPostVModel,
} = require("../viewmodels/ReactPostVModel");

function mapGetTotalReactPostToVModel(total) {
  return new getTotalReactPostVModel(total);
}

function mapCreateReactPostoVModel(reactComment) {
  return new createReacPostVModel(reactComment);
}

module.exports = {
  mapGetTotalReactPostToVModel,
  mapCreateReactPostoVModel,
};
