class Criteria {
  constructor({
    search = "",
    page = 1,
    rowsPerPage = 10,
    sortBy = "id",
    sortOrder = "ASC",
  }) {
    (this.search = search),
      (this.page = page),
      (this.rowsPerPage = rowsPerPage),
      (this.sortBy = sortBy),
      (this.sortOrder = sortOrder);
  }
}

module.exports = {
  Criteria,
};
