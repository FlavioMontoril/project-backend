import { ResourceNotFoundError } from "core/errors/resource-not-found.js"
import { MakeFindAllUsersFactory } from "core/factory/user-factory/make-find-all-users-factory.js"
import type { Request, Response } from "express"
import z from "zod"

class FindAllUsersController {
    public async handle(_: Request, res: Response) {
        try {

            const useCase = MakeFindAllUsersFactory.make()
            const users = await useCase.execute()
            const userToJSON = users.map(user => user.toJSON())
            console.log("To JSON", userToJSON)
            res.status(200).json(userToJSON)
            return
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.issues })
                return
            }
            if (error instanceof ResourceNotFoundError) {
                res.status(404).json({ error: error.message })
                return
            }
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
    }
}
export default new FindAllUsersController()