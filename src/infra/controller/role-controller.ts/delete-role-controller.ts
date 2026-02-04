import { MakeDeleteRoleFactory } from "@/core/factory/role-factory/make-delete-role-factory.js"
import { Request, Response } from "express"
import z from "zod"

class DeleteRoleController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string()
        });
        
        const { id } = paramsSchema.parse(req.params)
        const useCase = MakeDeleteRoleFactory.build()

        await useCase.execute(id)

        res.sendStatus(204)
        return
    }
}
export default new DeleteRoleController()