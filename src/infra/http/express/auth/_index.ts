import { Router } from "express";
import * as authenticateController from "./authenticate-controller.js";

export const router = Router()

router
.post('/', authenticateController.default.handle)