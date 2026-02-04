import { MakeFindByIdTaskFactory } from "@/core/factory/task-factory/make-find-by-id-use-case-factory.js"
import { Request, Response } from "express"
import z from "zod"

class FindByIdTaskController {
    public async handle(req: Request, res: Response) {

        const paramasSchema = z.object({
            id: z.string()
        });

        const { id } = paramasSchema.parse(req.params)
        const useCase = MakeFindByIdTaskFactory.build()

        const task = await useCase.execute(id)
        const taskTOJSON = task.toJSON()
        res.status(200).json(taskTOJSON)
    }
}
export default new FindByIdTaskController()