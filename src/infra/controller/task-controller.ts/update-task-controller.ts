import { InvalidOperationException } from "core/exceptions/InvalidOperationException.js"
import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js"
import { MakeUpdateTaskUseCaseFactory } from "core/factory/task-factory/make-update-task-use-case-factory.js"
import { TaskStatus, TaskType } from "core/types/task-types.js"
import type { Request, Response } from "express"
import z from "zod"

class UpdateTaskController {
    public async handle(req: Request, res: Response) {
        try {

            const paramsSchema = z.object({
                id: z.string()
            })

            const bodySchema = z.object({
                summary: z.string().optional(),
                description: z.string().optional(),
                assignee: z.string().optional(),
                reporter: z.string().optional(),
                type: z.nativeEnum(TaskType).optional(),
                status: z.nativeEnum(TaskStatus).optional(),
            })

            const { id } = paramsSchema.parse(req.params)
            const body = bodySchema.parse(req.body)
            const useCase = MakeUpdateTaskUseCaseFactory.build()
            const updatedTask = await useCase.execute(
                id,{
                summary: body.summary,
                description: body.description,
                assignee: body.assignee,
                reporter: body.reporter,
                type: body.type,
                status: body.status,
            })

            const taskTOJSON = updatedTask.toJSON()
            res.status(200).json(taskTOJSON)

        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ erro: error.issues })
                return
            }
            if (error instanceof ResourceNotFoundException) {
                res.status(400).json({ erro: error.message })
                return
            }
            if (error instanceof InvalidOperationException) {
                res.status(400).json({ erro: error.message })
                return
            }
            res.status(400).json({ message: 'Internal server Error' })
            return
        }
    }
}
export default new UpdateTaskController()