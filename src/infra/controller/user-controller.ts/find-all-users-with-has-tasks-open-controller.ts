import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js"
import { MakeFindAllUsersWithHasTasksOpenFactory } from "@/core/factory/user-factory/make-find-all-users-withHas-tasks-pendings-factory.js"
import { Request, Response } from "express"
import z from "zod"
class FindAllUsersWithHasTasksOpenController {
    public async handle(_: Request, res: Response) {
        try {
            const useCase  = MakeFindAllUsersWithHasTasksOpenFactory.build()
            const allUsers = await useCase.execute()
            res.status(200).json(allUsers)
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: error.issues })
            }
            if (error instanceof ResourceNotFoundException) {
                res.status(404).json({ message: error.message })
            }
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}
export default new FindAllUsersWithHasTasksOpenController()