import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate.js";
import * as createRoleController from "infra/controller/role-controller.ts/create-role-controller.js";
import * as deleteRoleController from "infra/controller/role-controller.ts/delete-role-controller.js";
import * as findAllRolesController from "infra/controller/role-controller.ts/find-all-roles-controller.js";
import * as findByIdRoleController from "infra/controller/role-controller.ts/find-by-id-role-controller.js";
import * as updateRoleController from "infra/controller/role-controller.ts/update-role-controller.js";
import * as findAllRoleByIdController from "infra/controller/role-controller.ts/find-all-role-by-id-controller.js";

export const router = Router()

router
.post('/', ensureAuthenticated, createRoleController.default.handle)
.delete('/:id', ensureAuthenticated, deleteRoleController.default.handle)
.put('/:id', ensureAuthenticated, updateRoleController.default.handle)
.get('/all', ensureAuthenticated, findAllRolesController.default.handle)
.get('/:id', ensureAuthenticated, findByIdRoleController.default.handle)
.get('/allRole/:id', ensureAuthenticated, findAllRoleByIdController.default.handle)
