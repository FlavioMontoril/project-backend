import { Router } from "express";
import { router as taskRoutes } from "../routes/task-routes.js";
import {router as roleRoutes} from "../routes/role-routes.js"
import {router as userRoutes} from "../routes/user-routes.js"
import { router as authRoutes } from "../express/auth/_index.js";

export const router = Router()

router
.use('/v1/tasks', taskRoutes)
.use('/v1/roles', roleRoutes)
.use('/v1/users', userRoutes)
.use('/v1/auth', authRoutes)