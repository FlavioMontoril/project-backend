import { Router } from "express";
import * as createRoleController from "infra/controller/role-controller.ts/create-role-controller.js";
import * as deleteRoleController from "infra/controller/role-controller.ts/delete-role-controller.js";
import * as findAllRolesController from "infra/controller/role-controller.ts/find-all-roles-controller.js";
import * as findByIdRoleController from "infra/controller/role-controller.ts/find-by-id-role-controller.js";
import * as findByRoleTypeController from "infra/controller/role-controller.ts/find-by-role-type-controller.js";
import * as updateRoleController from "infra/controller/role-controller.ts/update-role-controller.js";

export const router = Router()

router
.post('/', createRoleController.default.handle)
.delete('/:id', deleteRoleController.default.handle)
.put('/:id', updateRoleController.default.handle)
.get('/all', findAllRolesController.default.handle)
.get('/:id', findByIdRoleController.default.handle)
.get('/:name/option', findByRoleTypeController.default.handle)