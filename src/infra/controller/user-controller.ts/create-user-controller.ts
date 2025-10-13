import { ResourceAlreadyExistsError } from "core/errors/resource-already-exists.js"
import { InvalidPropertiesException } from "core/exceptions/InvalidPropertiesException.js"
import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js";
import { MakeCreateUserFactory } from "core/factory/user-factory/make-create-user-factory.js";
import type { Request, Response } from "express"
import z from "zod"

class CreateUserController {
    public async handle(req: Request, res: Response) {
        try {

            const bodySchema = z.object({
                name: z.string(),
                email: z.string(),
                passwordHash: z.string(),
                department: z.string(),
                roleId: z.string(),
            });

            const { name, email, passwordHash, department, roleId } = bodySchema.parse(req.body)
            const useCase = MakeCreateUserFactory.make()
            await useCase.execute({ name, email, passwordHash, department, roleId })
            res.status(201).json({ message: 'Created User'})
        } catch (error) {
            console.error(error);
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.issues })
                return
            }
            if (error instanceof InvalidPropertiesException) {
                res.status(400).json({ error: error.message })
                return
            }
            if (error instanceof ResourceAlreadyExistsError) {
                res.status(409).json({ error: error.message })
                return
            }
               if (error instanceof ResourceNotFoundException) {
                res.status(404).json({ error: error.message })
                return
            }
            res.status(400).json({ message: 'Internal Server Error' })
            return
        }
    }
}
export default new CreateUserController()