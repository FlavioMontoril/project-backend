import { MakeUpdateUserFactory } from "@/core/factory/user-factory/make-update-user-factory.js"
import { Request, Response } from "express"
import z, { email } from "zod"

class UpdateUserController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string()
        });
        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            department: z.string(),
            roleId: z.string(),
        });

        const { id } = paramsSchema.parse(req.params);
        const body = bodySchema.parse(req.body);

        const useCase = MakeUpdateUserFactory.build();
        const updatedUser = await useCase.execute(id, body);

        res.status(200).json(updatedUser);
        return
    }
}
export default new UpdateUserController()