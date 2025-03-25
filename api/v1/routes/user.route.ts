import { Router } from "express";
import * as controller from "../controllers/user.controller"
import * as validate from "../validate/user.validate";
import * as authMiddleware from "../middlewares/auth.middlewares"

const router: Router = Router();

router.post(
  "/register",
  validate.createPost, 
  controller.register
);

router.post(
  "/login",
  validate.login,
  controller.login
)

router.get(
  "/detail/:id", 
  authMiddleware.requireAuth,
  controller.detail,
);

router.get(
  "/list", 
  authMiddleware.requireAuth,
  controller.list
);
 
export const userRoutes: Router = router;