class getAllUserAbuseReportVModel {
  constructor({ id, user_id, content, created_date }) {
    this.id = id;
    this.user_id = user_id;
    this.created_date = created_date;
    this.content = content;
  }
}

class createUserAbuseReportVModel {
  constructor({ user_id, content }) {
    this.user_id = user_id;
    this.content = content;
  }
}

module.exports = {
  getAllUserAbuseReportVModel,
  createUserAbuseReportVModel,
};
