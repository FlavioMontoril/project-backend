import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js"
import { MakeDeleteUser } from "@/core/factory/user-factory/make-delete-user-factory.js"
import { Request, Response } from "express"
import z from "zod"

class DeleteUserController {
    public async handle(req: Request, res: Response) {
        try {

            const paramsSchema = z.object({
                id: z.string()
            })

            const {id} = paramsSchema.parse(req.params)
            const useCase = MakeDeleteUser.build()
            await useCase.execute(id)
            res.sendStatus(204)
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
export default new DeleteUserController()