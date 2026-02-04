import { MakeDeleteTaskUseCaseFactory } from "@/core/factory/task-factory/make-delete-task-use-case-factory.js"
import { Request, Response } from "express"
import z from "zod"
class DeleteTaskController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string(),
        });

        const { id } = paramsSchema.parse(req.params)
        const useCase = MakeDeleteTaskUseCaseFactory.build()
        await useCase.execute(id)
        res.sendStatus(200).json({ message: "Task delete" })
    }
}
export default new DeleteTaskController()