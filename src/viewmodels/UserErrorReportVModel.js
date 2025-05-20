class getAllUserErrorReportVModel {
  constructor({ id, user_id, user_fullname, post_id, post_image_url, title, content, created_date, status }) {
    this.id = id;
    this.user_id = user_id;
    this.user_fullname = user_fullname;
    this.post_id = post_id;
    this.post_image_url = post_image_url;
    this.title = title;
    this.content = content;
    this.created_date = created_date;
    this.status = status;
  }
}

class createUserErrorReportVModel {
  constructor({ user_id, post_id, title, content, created_date, status }) {
    this.user_id = user_id;
    this.post_id = post_id;
    this.title = title;
    this.content = content;
    this.created_date = created_date;
    this.status = status;
  }
}

class rejectUserErrorReportVModel {
  constructor({ status }) {
    this.status = status;
  }
}

class acceptUserErrorReportVModel {
  constructor({ status }) {
    this.status = status;
  }
}

module.exports = {
  getAllUserErrorReportVModel,
  createUserErrorReportVModel,
  rejectUserErrorReportVModel,
  acceptUserErrorReportVModel,
};
