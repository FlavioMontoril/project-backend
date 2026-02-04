import { MakeFindByIdRoleFactory } from "@/core/factory/role-factory/make-find-by-id-role-factory.js"
import { Request, Response } from "express"
import z from "zod"

class FindByIdRolerController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string()
        });

        const { id } = paramsSchema.parse(req.params);
        const useCase = MakeFindByIdRoleFactory.build();
        const role = await useCase.execute(id);
        const roleToJSON = role.toJSON();

        res.status(200).json(roleToJSON);
    }
}
export default new FindByIdRolerController()