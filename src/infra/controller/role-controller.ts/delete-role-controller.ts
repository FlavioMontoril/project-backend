import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js"
import { MakeDeleteRoleFactory } from "core/factory/role-factory/make-delete-role-factory.js"
import type { Request, Response } from "express"
import z from "zod"

class DeleteRoleController {
    public async handle(req: Request, res: Response) {
        try {

            const paramsSchema = z.object({
                id: z.string()
            })
            const { id } = paramsSchema.parse(req.params)
            const useCase = MakeDeleteRoleFactory.build()

            await useCase.execute(id)

            res.sendStatus(204)
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
export default new DeleteRoleController()