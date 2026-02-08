import { MakeUpdateTaskUseCaseFactory } from "@/core/factory/task-factory/make-update-task-use-case-factory.js"
import { TaskStatus, TaskType } from "@/core/types/task-types.js"
import { CustomRequest } from "@/infra/http/express/types/custom-request.js"
import { Response } from "express"
import z from "zod"

class UpdateTaskController {
    public async handle(req: CustomRequest, res: Response) {

        const userId = req?.user?.id;
        if (!userId) {
            res.status(403)
            return
        }
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
        const updatedTask = await useCase.execute(id, body, userId);

        const taskTOJSON = updatedTask.toJSON()
        res.status(200).json(taskTOJSON)
    }
}
export default new UpdateTaskController()