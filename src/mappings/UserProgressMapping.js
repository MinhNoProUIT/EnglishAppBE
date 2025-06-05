const {
    getAllUserProgressByCourseVModel,
    createUserProgressVModel,
    updateUserProgressVModel,
} = require("../viewmodels/UserProgressVModel");

function mapGetAllUserProgressByCourseToVModel(word) {
    return new getAllUserProgressByCourseVModel(word);
}

function mapCreateUserProgressToVModel(word) {
    return new createUserProgressVModel(word);
}

function mapUpdateUserProgressToVModel(word) {
    return new updateUserProgressVModel(word);
}

module.exports = {
    mapGetAllUserProgressByCourseToVModel,
    mapCreateUserProgressToVModel,
    mapUpdateUserProgressToVModel,
};
