import { Router } from "express";
import * as createTaskController from "infra/controller/task-controller.ts/create-task-controller.js";
import * as deleteTaskController from "infra/controller/task-controller.ts/delete-task-controller.js";
import * as findAllTasksController from "infra/controller/task-controller.ts/find-all-tasks-controller.js";
import * as findByIdTaskController from "infra/controller/task-controller.ts/find-by-id-task-controller.js";
import * as findTaskByTypeController from "infra/controller/task-controller.ts/find-task-by-type-controller.js";
import * as updateTaskController from "infra/controller/task-controller.ts/update-task-controller.js";

export const router = Router()
router
.post('/', createTaskController.default.handle)
.put('/update/:id', updateTaskController.default.handle)
.delete('/:id', deleteTaskController.default.handle)
.get('/', findAllTasksController.default.handle)
.get('/:id', findByIdTaskController.default.handle)
.get('/:type', findTaskByTypeController.default.handle)