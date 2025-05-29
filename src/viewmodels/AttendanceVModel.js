class getAllAttendanceVModel {
  constructor({ id, user_id }) {
    this.id = id;
    this.user_id = user_id;
    this.checkin_date = checkin_date;
  }
}

class createAttendanceVModel {
  constructor({ user_id }) {
    this.user_id = user_id;
  }
}

module.exports = {
  getAllAttendanceVModel,
  createAttendanceVModel,
};
