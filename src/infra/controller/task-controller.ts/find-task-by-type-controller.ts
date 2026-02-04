import { MakeFindByTypeTaskUsCase } from "@/core/factory/task-factory/make-find-by-type-task-use-case-factory.js"
import { TaskType } from "@/core/types/task-types.js"
import { Request, Response } from "express"
import z from "zod"

class FindTaskByTypeController {
    public async handle(req: Request, res: Response) {

        const paramasSchema = z.object({
            type: z.nativeEnum(TaskType)
        });

        const { type } = paramasSchema.parse(req.params)
        const useCase = MakeFindByTypeTaskUsCase.build()
        const task = await useCase.execute(type)
        const taskToJSON = task.map(task => task.toJSON())

        res.status(200).json(taskToJSON)
    }
}
export default new FindTaskByTypeController()