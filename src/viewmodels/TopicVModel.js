class getAllTopicsVModel {
  constructor({
    id,
    name,
    description,
  }) {
    this.id = id;
    this.name = name
    this.description = description;
  }
}

class createTopicVModel {
  constructor({
    name,
    description,
  }) {
    this.name = name
    this.description = description;
  }
}

class updateTopicVModel {
  constructor({
    name,
    description,
  }) {
    this.name = name
    this.description = description;
  }
}


module.exports = {
  getAllTopicsVModel,
  createTopicVModel,
  updateTopicVModel,
};
