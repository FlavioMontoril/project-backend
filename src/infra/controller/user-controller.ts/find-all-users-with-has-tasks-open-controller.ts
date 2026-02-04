import { MakeFindAllUsersWithHasTasksOpenFactory } from "@/core/factory/user-factory/make-find-all-users-withHas-tasks-pendings-factory.js"
import { Request, Response } from "express"
import z from "zod"
class FindAllUsersWithHasTasksOpenController {
    public async handle(_: Request, res: Response) {

        const useCase = MakeFindAllUsersWithHasTasksOpenFactory.build();
        const allUsers = await useCase.execute();

        res.status(200).json(allUsers);
    }
}
export default new FindAllUsersWithHasTasksOpenController();