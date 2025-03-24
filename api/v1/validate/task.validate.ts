import { Response, Request, NextFunction } from "express";

export const createPost = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body.title) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập tiêu đề!"
    });
    return;
  }
  next();
};
