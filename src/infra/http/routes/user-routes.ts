import { Router } from "express"
import * as createUserController from "infra/controller/user-controller.ts/create-user-controller.js"
import * as deleteUserController from "infra/controller/user-controller.ts/delete-user-controller.js"
import * as findAllUsersController from "infra/controller/user-controller.ts/find-all-users-controller.js"
import * as findUserByIdController from "infra/controller/user-controller.ts/find-user-by-id-controller.js"
import * as updatePasswordUserController from "infra/controller/user-controller.ts/update-password-user-controller.js"
import * as updateUserController from "infra/controller/user-controller.ts/update-user-controller.js"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate.js"

export const router = Router()
router
.post('/', ensureAuthenticated,  createUserController.default.handle)
.delete('/:id', ensureAuthenticated,  deleteUserController.default.handle)
.put('/:id/update', ensureAuthenticated, updateUserController.default.handle)
.put('/password/:id', ensureAuthenticated, updatePasswordUserController.default.handle)
.get('/user/:id', ensureAuthenticated, findUserByIdController.default.handle)
.get('/', ensureAuthenticated, findAllUsersController.default.handle)