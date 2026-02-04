import { MakeUpdateTaskUseCaseFactory } from "@/core/factory/task-factory/make-update-task-use-case-factory.js"
import { TaskStatus, TaskType } from "@/core/types/task-types.js"
import { Request, Response } from "express"
import z from "zod"

class UpdateTaskController {
    public async handle(req: Request, res: Response) {

        const paramsSchema = z.object({
            id: z.string()
        });

        const bodySchema = z.object({
            summary: z.string().optional(),
            description: z.string().optional(),
            assignee: z.string().optional(),
            reporter: z.string().optional(),
            type: z.nativeEnum(TaskType).optional(),
            status: z.nativeEnum(TaskStatus).optional(),
        });

        const { id } = paramsSchema.parse(req.params)
        const body = bodySchema.parse(req.body)
        const useCase = MakeUpdateTaskUseCaseFactory.build()
        const updatedTask = await useCase.execute(id, body);

        const taskTOJSON = updatedTask.toJSON()
        res.status(200).json(taskTOJSON)
    }
}
export default new UpdateTaskController()