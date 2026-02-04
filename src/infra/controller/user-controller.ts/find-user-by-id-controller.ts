import { MakeFindUserById } from "@/core/factory/user-factory/make-find-user-by-id-factory.js"
import { Request, Response } from "express"
import z from "zod"

class FindUserByIdController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string()
        });

        const { id } = paramsSchema.parse(req.params);
        const useCase = MakeFindUserById.build();
        const user = await useCase.execute(id);
        const userJson = user.toJSON();

        res.status(200).json(userJson);
        return
    }
}
export default new FindUserByIdController()