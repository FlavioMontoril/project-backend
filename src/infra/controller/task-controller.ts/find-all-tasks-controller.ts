import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js"
import { MakeFindAllTasksUseCaseFactory } from "@/core/factory/task-factory/make-find-all-tasks-use-case-factory.js"
import { Request, Response } from "express"
import z from "zod"
class FindAllTasksController {
    public async handle(_: Request, res: Response) {
        try {

            const useCase = MakeFindAllTasksUseCaseFactory.build()
            const allTasks = await useCase.execute()
            const tasksTOJSON = allTasks.map(task => task.toJSON())
            res.status(200).json(tasksTOJSON)
            return
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.issues })
                return
            }
            if (error instanceof ResourceNotFoundException) {
                res.status(400).json({ error: error.message })
                return
            }
            res.status(500).json({ error: 'Internal Server Error' })
            return
        }
    }
}
export default new FindAllTasksController()