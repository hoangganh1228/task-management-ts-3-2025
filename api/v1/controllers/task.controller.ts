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

export const changeStatus = async (req: Request, res: Response) => {
  try {
    type typeStatus = "initial" | "doing" | "finish" | "pending" | "notFinish";

    const id:string = req.params.id;
    const status:typeStatus = req.body.status;
    
    await Task.updateOne({
      _id: id,
      status: status 
    })

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }
}

export const changeMulti = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;

    switch (key) {
      case "status":
        await Task.updateMany({
          _id: { $in: ids }
        }, {
          status: value
        })

        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!",
        });
        break;

      default:
        res.json({
          code: 400,
          message: "Không tồn tại!",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }
}