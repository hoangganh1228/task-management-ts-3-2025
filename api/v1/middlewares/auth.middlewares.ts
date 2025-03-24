import { Request, Response, NextFunction } from "express";
import { User } from "../../../model/user.model";

export const requireAuth = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
  // console.log(req.headers.authorization);
  
  if(req.headers.authorization) {
    const user = await User.findOne({
      token: req.headers.authorization,
      deleted: false,
    }).select("-password -token");

    if(!user) {
      res.status(400).json({
        code: 400,
        message: "Không có quyền truy cập!"
      });
    } else {
      req["infoUser"] = user;
      next();
    }
  } else {
    res.status(400).json({
      code: 400,
      message: "Vui lòng gửi kèm token!"
    });
  }

  
}