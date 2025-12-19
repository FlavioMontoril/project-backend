import { InvalidPropertiesException } from "@/core/exceptions/InvalidPropertiesException.js";
import { MakeCreateRoleFactory } from "@/core/factory/role-factory/make-create-role-factory.js";
import { RoleOptions } from "@/core/types/role-types.js";
import { Request, Response } from "express";
import z from "zod"

class CreateRoleController{
    public async handle(req: Request, res: Response){
        try{
            const bodySchema = z.object({
                name: z.nativeEnum(RoleOptions),
                description: z.string(),
            })
            const {name, description} = bodySchema.parse(req.body)
            const useCase = MakeCreateRoleFactory.build()
            await useCase.execute({name, description})
            res.status(201).json({message: 'Created Role Succcesfully'})
        }catch(error){
            if(error instanceof z.ZodError){
                res.status(400).json({error: error.issues})
                return
            }
             if(error instanceof InvalidPropertiesException){
                res.status(400).json({error: error.message})
                return
            }
             res.status(500).json({message: 'Internal Server Error'})
                return
        }
    }
}
export default new CreateRoleController()