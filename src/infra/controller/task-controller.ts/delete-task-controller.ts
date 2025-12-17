import { PrismaTaskRepository } from "adapters/database/prisma/task/prisma-task-repository.js"
import { UnauthorizedActionError } from "core/errors/unauthorized-action.js"
import { InvalidOperationException } from "core/exceptions/InvalidOperationException.js"
import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js"
import { MakeDeleteTaskUseCaseFactory } from "core/factory/task-factory/make-delete-task-use-case-factory.js"
import {Request, Response} from "express"
import { CustomRequest } from "infra/http/express/types/custom-request.js"
import z from "zod"
class DeleteTaskController{
    public async handle(req: CustomRequest, res: Response){
        try{
            const paramsSchema = z.object({
                id: z.string(),
            });
            const userSchema = z.object({
                id: z.string(),
            })

            const {id} = paramsSchema.parse(req.params)
            const {id: loggedUserId} = userSchema.parse(req.user)
            const useCase = MakeDeleteTaskUseCaseFactory.build()
            await useCase.execute(id, loggedUserId)
            res.sendStatus(200).json({message: "Task delete"})
        }catch(error){
            if(error instanceof z.ZodError){
                res.status(400).json({error: error.issues})
                return
            }
             if(error instanceof ResourceNotFoundException){
                res.status(404).json({error: error.message})
                return
            }
             if(error instanceof InvalidOperationException){
                res.status(400).json({error: error.message})
                return
            }
            if(error instanceof UnauthorizedActionError){
                return res.status(403).json({message: error.message})
            }
             res.status(500).json({messahe: 'Internal Server Error'})
                return
        }
    }
}
export default new DeleteTaskController()