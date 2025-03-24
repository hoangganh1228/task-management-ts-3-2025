import {Router, Response, Request} from "express";
import * as controller from "../controllers/task.controller"
import * as validate from "../validate/task.validate"
const router: Router = Router();

router.get("/", controller.index)

router.get("/detail/:id", controller.detail) 

router.patch("/change-status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.post(
  "/create",
  validate.createPost,
  controller.createPost
)

router.patch(
  "/edit/:id", 
  validate.editPatch,
  controller.editPatch
);

router.delete("/delete/:id", controller.deleteTask);

export const taskRoutes: Router = router;


