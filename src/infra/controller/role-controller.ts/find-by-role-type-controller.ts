import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js"
import { MakeFindByRoleTypeFactory } from "core/factory/role-factory/make-find-by-role-type-factory.js"
import { RoleOptions } from "core/types/role-types.js"
import type { Request, Response } from "express"
import z from "zod"

class FindByRoleTypeController{
    public async handle(req: Request, res: Response){
        try{
            const paramasSchema = z.object({
                name: z.nativeEnum(RoleOptions)
            })
            const {name} = paramasSchema.parse(req.params)
            const useCase = MakeFindByRoleTypeFactory.make()
            const role = await useCase.execute(name)
            const roleToJSON = role.toJSON()
            res.status(200).json(roleToJSON)
            return
        }catch(error){
            if(error instanceof z.ZodError){
                res.status(400).json({error: error.issues})
                return
            }
              if(error instanceof ResourceNotFoundException){
                res.status(404).json({error: error.message})
                return
            }
             res.status(500).json({message: 'Internal Server Error'})
                return
        }
    }
}
export default new FindByRoleTypeController()