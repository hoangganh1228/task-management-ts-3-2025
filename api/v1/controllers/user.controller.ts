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

// [POST] /api/v1/users/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existEmail = await User.findOne({
    email: email
  });

  if(!existEmail) {
    res.status(400).json({
      code: 400,
      message: "Email không tồn tại!"
    });
    return;
  }

  if(md5(password) !== existEmail.password) {
    res.status(400).json({
      code: 400,
      message: "Sai mật khẩu!"
    });
    return;
  }

  const token = existEmail.token;
 
   // res.status(400).json();
  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token
  });
}

// [GET] /api/v1/users/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findOne({
    _id: id,
    deleted: false
  }).select("-password -token")

  res.json({
    code: 200,
    message: "Thành công!",
    info: user
  });
}

