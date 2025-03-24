interface objectPagination{
  currentPage: number,
  limitItems: number,
  skip?: number,
  totalPage?: number
}

export const paginationHelper = (objectPagination: objectPagination, query, countDocuments: number):objectPagination => {
  if(query.page) {
    objectPagination.currentPage = parseInt(query.page)
  }
  if(query.limit) {
    objectPagination.limitItems = parseInt(query.limit)
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
  const totalPage = Math.ceil(countDocuments / objectPagination.limitItems);
  objectPagination.totalPage = totalPage;
  return objectPagination;
}