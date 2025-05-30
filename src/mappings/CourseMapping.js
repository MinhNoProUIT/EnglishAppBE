const {
  getAllCoursesVModel,
  createCourseVModel,
  updateCourseVModel,
  getTotalCourseVModel,
} = require("../viewmodels/CourseVModel");

function mapGetAllCoursesToVModel(course) {
  return new getAllCoursesVModel(course);
}

function mapCreateCourseToVModel(course) {
  return new createCourseVModel(course);
}

function mapUpdateCourseToVModel(course) {
  return new updateCourseVModel(course);
}

function mapGetTotalCourseToVModel(result) {
  return new getTotalCourseVModel(result);
}

module.exports = {
  mapGetAllCoursesToVModel,
  mapCreateCourseToVModel,
  mapUpdateCourseToVModel,
  mapGetTotalCourseToVModel,
};
