import {Express} from "express";
import { taskRoutes } from "./task.route";
import { userRoutes } from "./user.route";
import * as authMiddleware from "../middlewares/auth.middlewares";

const mainV1Routes = (app: Express): void => {
  const version: string = "/api/v1";

  app.use(version + "/tasks", taskRoutes);

  app.use(
    version + "/users", 
    authMiddleware.requireAuth,
    userRoutes
  );
}

export default mainV1Routes;