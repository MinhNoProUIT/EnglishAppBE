class getAllCoursesVModel {
  constructor({
    id,
    title,
    topic_id,
    level,
    description,
    image_url,
    price,
    created_date,
  }) {
    this.id = id;
    this.title = title;
    this.topic_id = topic_id;
    this.level = level;
    this.description = description;
    this.image_url = image_url;
    this.price = price;
    this.created_date = created_date;
  }
}

class createCourseVModel {
  constructor({
    title,
    topic_id,
    level,
    description,
    image_url,
    price,
    created_date,
  }) {
    this.title = title;
    this.topic_id = topic_id;
    this.level = level;
    this.description = description;
    this.image_url = image_url;
    this.price = price;
    this.created_date = created_date;
  }
}

class getTotalCourseVModel {
  constructor({ total, rate }) {
    this.total = total;
    this.rate = rate;
  }
}

module.exports = {
  getAllCoursesVModel,
  createCourseVModel,
  getTotalCourseVModel
};
