import { Response, Request, NextFunction } from "express";

export const createPost = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body.title) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập tiêu đề!"
    });
    return;
  }
  if (!req.body.status) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập trạng thái công việc!"
    });
    return;
  }
  if (!req.body.content) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập nội dung công việc!!"
    });
    return;
  }
  next();
};

export const editPatch = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body.title) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập tiêu đề!"
    });
    return;
  }
  next();
};


