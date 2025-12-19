import z from "zod"
import { Request, Response } from "express"
import { MakeUserWithRoleFactory } from "./authenticate-factory.js";
import { InvalidArgumentsError } from "@/core/errors/invalid-arguments.js";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.js";

class AuthenticateController{

    public async handle(req: Request, res: Response){

        console.log("Auth Controller")
        try{
            const bodySchema = z.object({
                email: z.string(),
                password: z.string(),
            });
            
            const {email, password} = bodySchema.parse(req.body)

            const useCase = MakeUserWithRoleFactory.make()
            const result = await useCase.execute({email, password})
            res.status(200).json(result)
            return
        }catch(error){
              if (error instanceof z.ZodError) {
                res.status(400).json({ message: error.issues});
                return;
            }
             if (error instanceof InvalidArgumentsError) {
                res.status(400).json({ message: error.message});
                return;
            }
             if (error instanceof ResourceNotFoundError) {
                res.status(404).json({ message: error.message});
                return;
            }
              res.status(500).json({ message: 'Internal Server Error'});
                return;
        }
    }
}
export default new AuthenticateController()