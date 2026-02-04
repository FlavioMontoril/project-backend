import z from "zod"
import { Request, Response } from "express"
import { MakeUserWithRoleFactory } from "./authenticate-factory.js";

class AuthenticateController {

    public async handle(req: Request, res: Response) {
        const bodySchema = z.object({
            email: z.string(),
            password: z.string(),
        });

        const { email, password } = bodySchema.parse(req.body);

        const useCase = MakeUserWithRoleFactory.make();
        const result = await useCase.execute({ email, password });
        console.log("Result", result)
        res.status(200).json(result);
        return
    }
}
export default new AuthenticateController();