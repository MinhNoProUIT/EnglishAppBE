class Course {
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
    this.image_url = image_url;
    this.description = description;
    this.price = price;
    this.created_date = created_date;
  }
}

module.exports = Course;
