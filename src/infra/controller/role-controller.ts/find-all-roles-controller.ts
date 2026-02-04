import { MakeFindAllRolesFactory } from "@/core/factory/role-factory/make-find-all-roles-factory.js"
import { Request, Response } from "express"
import z from "zod"

class FindAllRolesController {
    public async handle(_: Request, res: Response) {

        const useCase = MakeFindAllRolesFactory.build();
        const roles = await useCase.execute();
        const rolesToJSON = roles.map(role => role.toJSON());
        
        res.status(200).json(rolesToJSON);
        return
    }
}
export default new FindAllRolesController();