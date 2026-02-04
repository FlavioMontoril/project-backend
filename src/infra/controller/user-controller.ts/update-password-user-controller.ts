import { MakeUpdatePasswordUserFactory } from "@/core/factory/user-factory/make-update-password-user-factory.js"
import { Request, Response } from "express"
import z from "zod"

class UpdatePasswordUserController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string(),
        });
        const bodySchema = z.object({
            currentPassword: z.string(),
            newPassword: z.string(),
        });

        const { id } = paramsSchema.parse(req.params);
        const { currentPassword, newPassword } = bodySchema.parse(req.body);

        const useCase = MakeUpdatePasswordUserFactory.build();
        await useCase.execute(id, { currentPassword, newPassword });

        res.sendStatus(204);
        return
    }
}
export default new UpdatePasswordUserController()