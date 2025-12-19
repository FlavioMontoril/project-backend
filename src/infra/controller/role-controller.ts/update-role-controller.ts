import { ResourceNotFoundException } from "@/core/exceptions/ResourceNotFoundException.js"
import { MakeUpdateFactory } from "@/core/factory/role-factory/update-role-factory.js"
import { RoleOptions } from "@/core/types/role-types.js"
import { Request, Response } from "express"
import z from "zod"

class UpdateRoleController {
    public async handle(req: Request, res: Response) {
        try {

            const paramsSchema = z.object({
                id: z.string()
            })
            const bodySchema = z.object({
                name: z.nativeEnum(RoleOptions).optional(),
                description: z.string().optional(),
            })

            const {id} = paramsSchema.parse(req.params)
            const { name, description } = bodySchema.parse(req.body)
            const useCase = MakeUpdateFactory.build()
            const updatedRole = await useCase.execute(id,{name, description})
            res.status(200).json(updatedRole)
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
export default new UpdateRoleController()