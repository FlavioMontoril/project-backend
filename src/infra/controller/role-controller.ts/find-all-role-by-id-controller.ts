import { FindAllRoleByIdFactory } from "@/core/factory/role-factory/find-all-role-by-id-factory.js";
import { Request, Response } from "express"
import z from "zod"

class FindAllRoleByIdController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string(),
        });

        const { id } = paramsSchema.parse(req.params);
        const useCase = FindAllRoleByIdFactory.build();
        const allRole = await useCase.execute(id);
        const allRoleToJson = allRole?.toJSON();

        res.status(200).json(allRoleToJson);
    }
}
export default new FindAllRoleByIdController();