import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists.js"
import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js"
import { MakeUpdateUserFactory } from "@/core/factory/user-factory/make-update-user-factory.js"
import { Request, Response } from "express"
import z, { email } from "zod"

class UpdateUserController {
    public async handle(req: Request, res: Response) {
        try {

            const paramsSchema = z.object({
                id: z.string()
            })
            const bodySchema = z.object({
                name: z.string(),
                email: z.string(),
                department: z.string(),
                roleId: z.string(),
            })
            const { id } = paramsSchema.parse(req.params)
            const { name, email, department, roleId } = bodySchema.parse(req.body)

            const useCase = MakeUpdateUserFactory.build()
            const updatedUser = await useCase.execute(id, { name, email, department, roleId })
            res.status(200).json(updatedUser)
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
            if (error instanceof ResourceAlreadyExistsError) {
                res.status(409).json({ error: error.message })
                return
            }
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
    }
}
export default new UpdateUserController()