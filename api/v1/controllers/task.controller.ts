import { Response, Request } from "express";
import { Task } from "../../../model/task.model";
import { paginationHelper } from "../helpers/pagination";
import { searchHeper } from "../helpers/search";

export const index = async (req: Request, res: Response) => {
  // Find
  interface Find {
    $or?: ({ listUsers: string[] } | { createdBy: string })[];
    deleted: boolean;
    status?: string;
    title?: RegExp;
  }

  // console.log(req["infoUser"].id);

  console.time("Query Time");
  const find: Find = {
    $or: [{ listUsers: req["infoUser"].id }, { createdBy: req["infoUser"].id }],
    deleted: false,
  };
  // End Find

  if (req.query.status) {
    find.status = req.query.status.toString();
  }

  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toString();
    sort[sortKey] = req.query.sortValue;
  }

  const countTasks = await Task.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countTasks
  );

  const objectSearch = searchHeper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  console.timeEnd("Query Time"); // Kết thúc đo thời gian
  // console.log(tasks);

  res.json(tasks);
};

export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const task = await Task.find({
    _id: id,
    deleted: false,
  });

  res.json(task);
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    type typeStatus = "initial" | "doing" | "finish" | "pending" | "notFinish";

    const id: string = req.params.id;
    console.log(id);

    const status: typeStatus = req.body.status;
    console.log(status);

    const validateStatuses: typeStatus[] = [
      "initial",
      "doing",
      "finish",
      "pending",
      "notFinish",
    ];

    if (!validateStatuses.includes(status as typeStatus)) {
      return res.status(400).json({
        code: 400,
        message: "Trạng thái không hợp lệ!",
      });
    }

    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!",
    });
  }
};

export const changeMulti = async (req: Request, res: Response) => {
  try {
    enum Key {
      STATUS = "status",
      DELETE = "delete",
    }
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;

    switch (key) {
      case Key.STATUS:
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          }
        );

        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!",
        });
        break;

      case Key.DELETE:
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            deleted: true,
            deletedAt: new Date(),
          }
        );

        res.json({
          code: 200,
          message: "Xóa thành công!",
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
      message: "Không tồn tại!",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    req.body.createdBy = req["infoUser"].id;
    const task = new Task(req.body);
    const data = await task.save();

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

export const editPatch = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    await Task.updateOne(
      {
        _id: id,
      },
      req.body
    );

    res.json({
      code: 200,
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

// [DELETE] /api/v1/tasks/delete/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    await Task.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );

    res.json({
      code: 200,
      message: "Xóa thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};
