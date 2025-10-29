import { InvalidArgumentsError } from "core/errors/invalid-arguments.js"
import { ResourceNotFoundError } from "core/errors/resource-not-found.js"
import { InvalidOperationException } from "core/exceptions/InvalidOperationException.js"
import { MakeUpdatePasswordUserFactory } from "core/factory/user-factory/make-update-password-user-factory.js"
import type { Request, Response } from "express"
import z from "zod"

class UpdatePasswordUserController{
    public async handle(req: Request, res: Response){
        try{
            const paramsSchema = z.object({
                id: z.string(),
            })
            const bodySchema = z.object({
                currentPassword: z.string(),
                newPassword: z.string(),
            })

            const {id} = paramsSchema.parse(req.params)
            const {currentPassword, newPassword} = bodySchema.parse(req.body)

            const useCase = MakeUpdatePasswordUserFactory.build()
            await useCase.execute(id,{currentPassword, newPassword})
            res.sendStatus(204);
            return
        }catch(error){
            if(error instanceof z.ZodError){
                res.status(400).json({error: error.issues})
                return
            }
               if(error instanceof InvalidOperationException){
                res.status(404).json({error: error.message})
                return
            }
             if(error instanceof ResourceNotFoundError){
                res.status(404).json({error: error.message})
                return
            }
               if(error instanceof InvalidArgumentsError){
                res.status(404).json({error: error.message})
                return
            }
              res.status(500).json({message: 'Internal Server Error'})
                return
        }
    }
}
export default new UpdatePasswordUserController()