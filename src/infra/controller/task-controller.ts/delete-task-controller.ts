import { InvalidOperationException } from "@/core/exceptions/InvalidOperationException.js"
import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js"
import { MakeDeleteTaskUseCaseFactory } from "@/core/factory/task-factory/make-delete-task-use-case-factory.js"
import {Request, Response} from "express"
import z from "zod"
class DeleteTaskController{
    public async handle(req: Request, res: Response){
        try{
            const paramsSchema = z.object({
                id: z.string(),
            })

            const {id} = paramsSchema.parse(req.params)
            const useCase = MakeDeleteTaskUseCaseFactory.build()
            await useCase.execute(id)
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
             res.status(500).json({messahe: 'Internal Server Error'})
                return
        }
    }
}
export default new DeleteTaskController()