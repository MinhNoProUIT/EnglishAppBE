class getAllWordsVModel {
  constructor({
    id,
    englishname,
    vietnamesename,
    type,
    examplesentence,
    imageurl,
    transcription,
    course_id,
  }) {
    this.id = id;
    this.englishname = englishname;
    this.vietnamesename = vietnamesename;
    this.type = type;
    this.examplesentence = examplesentence;
    this.imageurl = imageurl;
    this.transcription = transcription;
    this.course_id = course_id;
  }
}

class createWordVModel {
  constructor({
    englishname,
    vietnamesename,
    type,
    examplesentence,
    imageurl,
    transcription,
    course_id,
  }) {
    this.englishname = englishname;
    this.vietnamesename = vietnamesename;
    this.type = type;
    this.examplesentence = examplesentence;
    this.imageurl = imageurl;
    this.transcription = transcription;
    this.course_id = course_id;
  }
}

class updateWordVModel {
  constructor({
    englishname,
    vietnamesename,
    type,
    examplesentence,
    imageurl,
    transcription,
    course_id,
  }) {
    this.englishname = englishname;
    this.vietnamesename = vietnamesename;
    this.type = type;
    this.examplesentence = examplesentence;
    this.imageurl = imageurl;
    this.transcription = transcription;
    this.course_id = course_id;
  }
}

class getAllWordsByCourseVModel {
  constructor({
    id,
    englishname,
    vietnamesename,
    type,
    examplesentence,
    imageurl,
    transcription,
    course_id,
  }) {
    this.id = id;
    this.englishname = englishname;
    this.vietnamesename = vietnamesename;
    this.type = type;
    this.examplesentence = examplesentence;
    this.imageurl = imageurl;
    this.transcription = transcription;
    this.course_id = course_id;
  }
}

module.exports = {
  getAllWordsVModel,
  createWordVModel,
  updateWordVModel,
  getAllWordsByCourseVModel,
};
