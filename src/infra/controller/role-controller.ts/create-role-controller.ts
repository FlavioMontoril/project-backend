import { MakeCreateRoleFactory } from "@/core/factory/role-factory/make-create-role-factory.js";
import { RoleOptions } from "@/core/types/role-types.js";
import { Request, Response } from "express";
import z from "zod"

class CreateRoleController {
    public async handle(req: Request, res: Response) {

        const bodySchema = z.object({
            name: z.nativeEnum(RoleOptions),
            description: z.string(),
        });
        const body = bodySchema.parse(req.body)
        const useCase = MakeCreateRoleFactory.build()
        await useCase.execute(body)
        res.status(201).json({ message: 'Created Role Succcesfully' })
    }
}
export default new CreateRoleController()