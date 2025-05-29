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
    id,
    name,
    description,
  }) {
    this.id = id;
    this.name = name
    this.description = description;
  }
}

class updateTopicVModel {
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


module.exports = {
  getAllTopicsVModel,
  createTopicVModel,
  updateTopicVModel,
};
