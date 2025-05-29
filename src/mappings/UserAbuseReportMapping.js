const {
  createUserAbuseReportVModel,
  getAllUserAbuseReportVModel,
} = require("../viewmodels/UserAbuseReportsVModel");

function mapGetAllUserAbuseReportToVModel(reports) {
  return new getAllUserAbuseReportVModel(reports);
}

function mapCreateUserAbuseReportToVModel(reports) {
  return new createUserAbuseReportVModel(reports);
}

module.exports = {
  mapGetAllUserAbuseReportToVModel,
  mapCreateUserAbuseReportToVModel,
};
