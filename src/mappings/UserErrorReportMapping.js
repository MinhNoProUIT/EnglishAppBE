const {
  getAllUserErrorReportVModel,
  createUserErrorReportVModel,
  rejectUserErrorReportVModel,
  acceptUserErrorReportVModel,
} = require("../viewmodels/UserErrorReportVModel");

function mapGetAllUserErrorReportsToVModel(reports) {
  return new getAllUserErrorReportVModel(reports);
}

function mapCreateUserErrorReportToVModel(report) {
  return new createUserErrorReportVModel(report);
}

function mapRejectUserErrorReportToVModel(status) {
  return new rejectUserErrorReportVModel(status);
}

function mapAcceptUserErrorReportToVModel(status) {
  return new acceptUserErrorReportVModel(status);
}

module.exports = {
  mapGetAllUserErrorReportsToVModel,
  mapCreateUserErrorReportToVModel,
  mapRejectUserErrorReportToVModel,
  mapAcceptUserErrorReportToVModel
};
