import { Response, Request, NextFunction } from "express";

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.fullName) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập họ tên!"
    });
    return;
  }

  if(!req.body.email) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập email!"
    });
    return;
  }

  if(!req.body.password) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập mật khẩu!"
    });
    return;
  }

  next();
}

export const login = (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.email) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập email!"
    });
    return;
  }

  if(!req.body.password) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập mật khẩu!"
    });
    return;
  }

  next();
}