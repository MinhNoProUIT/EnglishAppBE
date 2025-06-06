const {
  getAllAttendanceVModel,
  createAttendanceVModel,
} = require("../viewmodels/AttendanceVModel");

function mapGetAllAttendanceToVModel(attendance) {
  return new getAllAttendanceVModel(attendance);
}

function mapCreateAttendanceToVModel(attendance) {
  return new createAttendanceVModel(attendance);
}

module.exports = {
  mapGetAllAttendanceToVModel,
  mapCreateAttendanceToVModel,
};
