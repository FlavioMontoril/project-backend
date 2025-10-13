import { Router } from "express"
import * as createUserController from "infra/controller/user-controller.ts/create-user-controller.js"
import * as deleteUserController from "infra/controller/user-controller.ts/delete-user-controller.js"
import * as findAllUsersController from "infra/controller/user-controller.ts/find-all-users-controller.js"
import * as findUserByEmailController from "infra/controller/user-controller.ts/find-user-by-email-controller.js"
import * as findUserByIdController from "infra/controller/user-controller.ts/find-user-by-id-controller.js"
import * as updatePasswordUserController from "infra/controller/user-controller.ts/update-password-user-controller.js"
import * as updateUserController from "infra/controller/user-controller.ts/update-user-controller.js"

export const router = Router()
router
.post('/', createUserController.default.handle)
.delete('/:id', deleteUserController.default.handle)
.put('/:id/update', updateUserController.default.handle)
.put('/password/:id', updatePasswordUserController.default.handle)
.get('/:id/user', findUserByIdController.default.handle)
.get('/:email', findUserByEmailController.default.handle)
.get('/', findAllUsersController.default.handle)