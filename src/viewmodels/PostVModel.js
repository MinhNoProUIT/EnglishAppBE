class PostCreateVModel {
  constructor({
    user_id,
    react_count = 0,
    content,
    image_url,
    shared_user_id_count = 0,
    comment_count = 0,
  }) {
    this.user_id = user_id;
    this.react_count = react_count;
    this.content = content;
    this.image_url = image_url;
    this.shared_user_id_count = shared_user_id_count;
    this.comment_count = comment_count;
  }
}

class PostUpdateVModel {
  constructor({
    id,
    user_id,
    react_count = 0,
    content,
    image_url,
    shared_user_id_count = 0,
    comment_count = 0,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.react_count = react_count;
    this.content = content;
    this.image_url = image_url;
    this.shared_user_id_count = shared_user_id_count;
    this.comment_count = comment_count;
  }
}

class PostGetAllVModel {
  constructor({
    id,
    user_id,
    react_count = 0,
    content,
    created_date,
    image_url,
    author_name,
    author_image_url,
    shared_user_id_count = 0,
    comment_count = 0,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.react_count = react_count;
    this.content = content;
    this.created_date = created_date;
    this.image_url = image_url;
    this.author_name = author_name,
    this.author_image_url = author_image_url,
    this.shared_user_id_count = shared_user_id_count;
    this.comment_count = comment_count;
  }
}

class PostGetAllByUserVModel {
  constructor({
    id,
    user_id,
    react_count = 0,
    content,
    created_date,
    image_url,
    author_name,
    author_image_url,
    shared_user_id_count = 0,
    comment_count = 0,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.react_count = react_count;
    this.content = content;
    this.created_date = created_date;
    this.image_url = image_url;
    this.author_name = author_name,
    this.author_image_url = author_image_url,
    this.shared_user_id_count = shared_user_id_count;
    this.comment_count = comment_count;
  }
}

class PostGetTotalVModel {
  constructor({ total, rate }) {
    this.total = total;
    this.rate = rate;
  }
}

class PostDataChartVModel {
  constructor({ date, count }) {
    this.date = date;   
    this.count = count; 
  }
}

module.exports = {
  PostCreateVModel,
  PostUpdateVModel,
  PostGetAllVModel,
  PostGetTotalVModel,
  PostDataChartVModel,
  PostGetAllByUserVModel
};
