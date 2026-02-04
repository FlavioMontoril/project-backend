import { MakeFindAllUsersFactory } from "@/core/factory/user-factory/make-find-all-users-factory.js"
import { Request, Response } from "express"
import z from "zod"

class FindAllUsersController {
    public async handle(_: Request, res: Response) {

        const useCase = MakeFindAllUsersFactory.build();
        const users = await useCase.execute();
        const userToJSON = users.map(user => user.toJSON());

        res.status(200).json(userToJSON);
        return
    }
}
export default new FindAllUsersController()