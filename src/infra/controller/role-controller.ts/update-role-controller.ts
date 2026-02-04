import { MakeUpdateFactory } from "@/core/factory/role-factory/update-role-factory.js"
import { RoleOptions } from "@/core/types/role-types.js"
import { Request, Response } from "express"
import z from "zod"

class UpdateRoleController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string()
        });

        const bodySchema = z.object({
            name: z.nativeEnum(RoleOptions).optional(),
            description: z.string().optional(),
        });

        const { id } = paramsSchema.parse(req.params);
        const body = bodySchema.parse(req.body);
        const useCase = MakeUpdateFactory.build();
        const updatedRole = await useCase.execute(id, body);

        res.status(200).json(updatedRole);
        return
    }
}
export default new UpdateRoleController()