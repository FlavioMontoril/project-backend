import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js"
import { MakeFindByIdRoleFactory } from "@/core/factory/role-factory/make-find-by-id-role-factory.js"
import { Request, Response } from "express"
import z from "zod"

class FindByIdRolerController {
    public async handle(req: Request, res: Response) {
        try {

            const paramsSchema = z.object({
                id: z.string()
            })
            const {id} = paramsSchema.parse(req.params)
            const useCase = MakeFindByIdRoleFactory.build()
            const role = await useCase.execute(id)
            const roleToJSON = role.toJSON()
            res.status(200).json(roleToJSON)
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.issues })
                return
            }
            if (error instanceof ResourceNotFoundException) {
                res.status(404).json({ error: error.message })
                return
            }
            res.status(500).json({ message: "Internal Server Error" })
            return
        }
    }
}
export default new FindByIdRolerController()