module.exports = (pagination, query, counProduct) => {
  if (query.page) {
    pagination.currentPage = parseInt(query.page);
  }
  pagination.skip = (pagination.currentPage - 1) * pagination.limitPage;
  pagination.totalPage = Math.ceil(counProduct / pagination.limitPage);
  pagination.showPagination = pagination.showPagination;
  return pagination;
};
