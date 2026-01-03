
import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { validate } from "../middleware/validate";
import { createNotifySchema } from "../validations/notification.validation";

const routes = Router();
const controller = new NotificationController();
routes.post("/",validate(createNotifySchema),controller.createNotification);
routes.get("/me", controller.getUserNotification);
routes.get("/:id", controller.getMyNotification);
routes.patch("/:id", controller.markAsRead);
export default routes;;