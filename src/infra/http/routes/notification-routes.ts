import { Router } from "express";
import * as markAsReadController from "@/infra/controller/notification-controller/mark-as-read-controller.js"
import * as markAllAsReadController from "@/infra/controller/notification-controller/mark-all-as-read-controller.js"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate.js";

export const router = Router();

router
    .patch('/mark-as-read/:recipientId', ensureAuthenticated, markAsReadController.default.handle)
    .patch('/mark-all-as-read/', ensureAuthenticated, markAllAsReadController.default.handle)
