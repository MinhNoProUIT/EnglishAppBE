class Group {
  constructor({ id, name, image_url, created_by, count_member, created_date }) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
    this.created_by = created_by;
    this.count_member = count_member;
    this.created_date = created_date;
  }
}

module.exports = Group;
