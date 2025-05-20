const {
  getAllCoursesVModel,
  createCourseVModel,
  getTotalCourseVModel,
} = require("../viewmodels/CourseVModel");

function mapGetAllCoursesToVModel(post) {
  return new getAllCoursesVModel(post);
}

function mapCreateCoursesToVModel(post) {
  return new createCourseVModel(post);
}

function mapGetTotalCourseToVModel(result) {
  return new getTotalCourseVModel(result);
}

module.exports = {
  mapGetAllCoursesToVModel,
  mapCreateCoursesToVModel,
  mapGetTotalCourseToVModel,
};
