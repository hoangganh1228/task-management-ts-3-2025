import { Router } from "express";
import * as controller from "../controllers/user.controller"
import * as validate from "../validate/user.validate";

const router: Router = Router();

router.post(
  "/register",
  validate.createPost, 
  controller.register
);
 
export const userRoutes: Router = router;