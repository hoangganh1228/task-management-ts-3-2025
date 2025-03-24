import {Response, Request} from "express"
import { Task } from "../../../model/task.model";
import { paginationHelper } from "../helpers/pagination";
import { searchHeper } from "../helpers/search";

export const index = async (req: Request, res: Response) => {
  // Find
  interface Find {
    deleted: boolean,
    status?: string,
    title?: RegExp
  }

  const find: Find = {
    deleted: false
  }
  // End Find

  if(req.query.status) {
    find.status = req.query.status.toString();
  }

  const sort = {};
  if(req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toString();
    sort[sortKey] = req.query.sortValue
  }

  const countTasks = await Task.countDocuments(find);
  
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 2,
    }, 
    req.query,
    countTasks
  )

  const objectSearch = searchHeper(req.query);
  if(objectSearch.regex) {
    find.title = objectSearch.regex
  }
  

  const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);  

  console.log(tasks);

  res.json(tasks);
}

export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const task = await Task.find({
    _id: id,
    deleted: false
  })

  res.json(task)
}