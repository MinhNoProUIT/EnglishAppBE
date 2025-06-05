class UserProgress {
    constructor({
        id,
        word_id,
        user_id,
        level,
        createdstudydate,
        updatedstudydate
    }) {
        this.id = id;
        this.word_id = word_id;
        this.user_id = user_id;
        this.level = level;
        this.created_date = createdstudydate;
        this.updatedstudydate = updatedstudydate;
    }
}

module.exports = UserProgress;
