import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js"
import { MakeFindUserById } from "core/factory/user-factory/make-find-user-by-id-factory.js"
import type { Request, Response } from "express"
import z from "zod"

class FindUserByIdController {
    public async handle(req: Request, res: Response) {
        try {

            const paramsSchema = z.object({
                id: z.string()
            })
            const {id} = paramsSchema.parse(req.params)
            const useCase = MakeFindUserById.make()
            const user = await useCase.execute(id)
            console.log("USER", user)
            res.status(200).json(user.toJSON())
            return
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.issues })
                return
            }
            if (error instanceof ResourceNotFoundException) {
                res.status(404).json({ error: error.message })
                return
            }
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
    }
}
export default new FindUserByIdController()