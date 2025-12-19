import { Router } from "express";
import * as createTaskController from "@/infra/controller/task-controller.ts/create-task-controller.js";
import * as deleteTaskController from "@/infra/controller/task-controller.ts/delete-task-controller.js";
import * as findAllTasksController from "@/infra/controller/task-controller.ts/find-all-tasks-controller.js";
import * as findByIdTaskController from "@/infra/controller/task-controller.ts/find-by-id-task-controller.js";
import * as findTaskByTypeController from "@/infra/controller/task-controller.ts/find-task-by-type-controller.js";
import * as updateTaskController from "@/infra/controller/task-controller.ts/update-task-controller.js";
import { ensureAuthenticated } from "@/infra/http/middlewares/ensureAuthenticate.js";

export const router = Router()

router
.post('/', ensureAuthenticated, createTaskController.default.handle)
.put('/update/:id', ensureAuthenticated, updateTaskController.default.handle)
.delete('/:id', ensureAuthenticated, deleteTaskController.default.handle)
.get('/', ensureAuthenticated, findAllTasksController.default.handle)
.get('/:id', ensureAuthenticated, findByIdTaskController.default.handle)
.get('/type/:type', ensureAuthenticated, findTaskByTypeController.default.handle)