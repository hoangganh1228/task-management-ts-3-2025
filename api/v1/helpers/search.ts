interface objectSearch{
  keyword: string,
  regex?: RegExp
}

export const searchHeper = (query): objectSearch => {
  let objectSearch: objectSearch = {
    keyword: ""
  };

  if(query.keyword) {
    objectSearch.keyword = query.keyword;
    
    const regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
  }

  
  return objectSearch;
}