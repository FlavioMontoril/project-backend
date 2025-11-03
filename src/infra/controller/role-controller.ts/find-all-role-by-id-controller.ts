import { ResourceNotFoundError } from "core/errors/resource-not-found.js";
import { InvalidPropertiesException } from "core/exceptions/InvalidPropertiesException.js";
import { FindAllRoleByIdFactory } from "core/factory/role-factory/find-all-role-by-id-factory.js";
import { Request, Response } from "express"
import z from "zod"

class FindAllRoleByIdController {
    public async handle(req: Request, res: Response) {
        try {
            const paramsSchema = z.object({
                id: z.string(),
            });

            const { id } = paramsSchema.parse(req.params)
            const useCase = FindAllRoleByIdFactory.build()
            const allRole = await useCase.execute(id)
            const allRoleToJson = allRole?.toJSON()
            res.status(200).json(allRoleToJson)

        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: error.issues })
            }
            if (error instanceof InvalidPropertiesException) {
                return res.status(400).json({ message: error.message })
            }
            if (error instanceof ResourceNotFoundError) {
                return res.status(404).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}
export default new FindAllRoleByIdController()