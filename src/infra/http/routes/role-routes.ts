import { Router } from "express";
import * as createRoleController from "infra/controller/role-controller.ts/create-role-controller.js";
import * as deleteRoleController from "infra/controller/role-controller.ts/delete-role-controller.js";
import * as findAllRolesController from "infra/controller/role-controller.ts/find-all-roles-controller.js";
import * as findByIdRoleController from "infra/controller/role-controller.ts/find-by-id-role-controller.js";
import * as findByRoleTypeController from "infra/controller/role-controller.ts/find-by-role-type-controller.js";
import * as updateRoleController from "infra/controller/role-controller.ts/update-role-controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate.js";

export const router = Router()

router
.post('/', ensureAuthenticated, createRoleController.default.handle)
.delete('/:id', ensureAuthenticated, deleteRoleController.default.handle)
.put('/:id', ensureAuthenticated, updateRoleController.default.handle)
.get('/all', ensureAuthenticated, findAllRolesController.default.handle)
.get('/:id', ensureAuthenticated, findByIdRoleController.default.handle)
.get('/:name/option', ensureAuthenticated, findByRoleTypeController.default.handle)