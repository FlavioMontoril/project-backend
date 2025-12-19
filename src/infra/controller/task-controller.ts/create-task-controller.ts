import { InvalidPropertiesException } from "@/core/exceptions/InvalidPropertiesException.js"
import { MakeCreateTaskUseCaseFactory } from "@/core/factory/task-factory/make-create-task-use-case-factory.js";
import { TaskStatus, TaskType } from "@/core/types/task-types.js"
import { Request, Response } from "express"
import z from "zod"
class CreateTaskController{
    public async handle(req: Request, res: Response){
        try{
            
            const bodySchema = z.object({
                summary: z.string(),
                description: z.string(),
                assignee: z.string().optional(),
                reporter: z.string(),
                type: z.nativeEnum(TaskType),
                status: z.nativeEnum(TaskStatus).optional(),
                createdAt: z.string().optional(),
                userId: z.string().optional(),
            });
            
            const {summary, description, assignee, reporter, type, status, createdAt, userId} = bodySchema.parse(req.body)
            const useCase = MakeCreateTaskUseCaseFactory.build()
            await useCase.execute({summary, description, assignee, reporter, type, status, createdAt: createdAt ? new Date(createdAt) : new Date(), userId})
            res.status(201).json({message: 'Task Created Succesfully'})
            return
        }catch(error){
            if(error instanceof z.ZodError){
                res.status(400).json({error: error.issues})
                return
            }
            if(error instanceof InvalidPropertiesException){
                res.status(400).json({error: error.message})
                return
            }
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
}
export default new CreateTaskController()