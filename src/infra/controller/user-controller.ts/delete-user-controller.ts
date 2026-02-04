import { MakeDeleteUser } from "@/core/factory/user-factory/make-delete-user-factory.js"
import { Request, Response } from "express"
import z from "zod"

class DeleteUserController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string()
        });

        const { id } = paramsSchema.parse(req.params);
        const useCase = MakeDeleteUser.build();
        await useCase.execute(id);

        res.sendStatus(204);
    }
}
export default new DeleteUserController()