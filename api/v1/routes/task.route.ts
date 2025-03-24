import {Router, Response, Request} from "express";
import { Task } from "../../../model/task.model";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false
  })  

  console.log(tasks);

  res.json(tasks);
})


router.get("/detail/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const task = await Task.find({
    _id: id,
    deleted: false
  })

  res.json(task)
}) 


export const taskRoutes: Router = router;


