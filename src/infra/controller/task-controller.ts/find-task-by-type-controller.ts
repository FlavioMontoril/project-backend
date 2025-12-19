import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js"
import { MakeFindByTypeTaskUsCase } from "@/core/factory/task-factory/make-find-by-type-task-use-case-factory.js"
import { TaskType } from "@/core/types/task-types.js"
import { Request, Response } from "express"
import z from "zod"

class FindTaskByTypeController {
    public async handle(req: Request, res: Response) {

        try {
            const paramasSchema = z.object({
                type: z.nativeEnum(TaskType)
            });

            const { type } = paramasSchema.parse(req.params)
            const useCase = MakeFindByTypeTaskUsCase.build()
            const task = await useCase.execute(type)
            const taskToJSON = task.map(task => task.toJSON())
            
            res.status(200).json(taskToJSON)
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.issues })
                return
            }
            if (error instanceof ResourceNotFoundException) {
                res.status(400).json({ error: error.message })
                return
            }
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
    }
}
export default new FindTaskByTypeController()