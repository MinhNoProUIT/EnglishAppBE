class Quiz {
  constructor({
    id,
    user_id,
    title,
    created_date
  }) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.created_date = created_date;
  }
}

module.exports = Quiz;
