import { ResourceNotFoundException } from "core/exceptions/ResourceNotFoundException.js"
import { MakeFindAllRolesFactory } from "core/factory/role-factory/make-find-all-roles-factory.js"
import type { Request, Response } from "express"
import z from "zod"

class FindAllRolesController{
    public async handle(_: Request, res: Response){
        try{
            const useCase = MakeFindAllRolesFactory.build()
            const roles = await useCase.execute()
            const rolesToJSON = roles.map(role=> role.toJSON())
            res.status(200).json(rolesToJSON)
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
export default new FindAllRolesController()