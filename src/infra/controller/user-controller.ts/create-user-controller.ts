import { MakeCreateUserFactory } from "@/core/factory/user-factory/make-create-user-factory.js";
import { Request, Response } from "express"
import z from "zod"

class CreateUserController {
    public async handle(req: Request, res: Response) {

        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            passwordHash: z.string(),
            department: z.string(),
            roleId: z.string(),
        });

        const body = bodySchema.parse(req.body);
        const useCase = MakeCreateUserFactory.build();
        await useCase.execute(body);

        res.status(201).json({ message: 'Created User' });
    }
}
export default new CreateUserController()