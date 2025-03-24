import { Request, Response } from "express";
import md5 from "md5";
import { User } from "../../../model/user.model";
import { generateRandomString } from "../helpers/generate";

// [POST] /api/v1/users/register
export const register = async (req: Request, res: Response) => {
  const emailExist = await User.findOne({
    email: req.body.email,
    deleted: false
  })

  if(emailExist) {
    res.status(400).json({
      code: 400,
      message: "Email đã tồn tại!"
    })
  } else {
    const newUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      token: generateRandomString(30)
    }

    const data = await User.create(newUser);
    const token = data.token;

    res.json({
      code: 200,
      message: "Tạo tài khoản thành công!",
      token: token
    });
  }


}

