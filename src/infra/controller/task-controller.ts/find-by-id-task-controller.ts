import { Task } from "core/entities/task-entitie.js"
import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js"
import { MakeFindAllTasksUseCaseFactory } from "core/factory/task-factory/make-find-all-tasks-use-case-factory.js"
import { MakeFindByIdTaskFactory } from "core/factory/task-factory/make-find-by-id-use-case-factory.js"
import type { Request, Response } from "express"
import z from "zod"

class FindByIdTaskController{
    public async handle(req: Request, res: Response){
        try{

            const paramasSchema = z.object({
                id: z.string()
            })

            const {id} = paramasSchema.parse(req.params)
            const useCase = MakeFindByIdTaskFactory.make()

            const task = await useCase.execute(id)
            const taskTOJSON = task.toJSON()
            res.status(200).json(taskTOJSON)
        }catch(error){
            if(error instanceof z.ZodError){
                res.status(400).json({error: error.issues})
                return
            }
             if(error instanceof ResourceNotFoundException){
                res.status(400).json({error: error.message})
                return
            }
             res.status(500).json({message: 'Internal Server Error'})
                return
        }
    }
}
export default new FindByIdTaskController()