import { MakeFindAllTasksUseCaseFactory } from "@/core/factory/task-factory/make-find-all-tasks-use-case-factory.js"
import { Request, Response } from "express"

class FindAllTasksController {
    public async handle(_: Request, res: Response) {

        const useCase = MakeFindAllTasksUseCaseFactory.build();
        const allTasks = await useCase.execute();
        const tasksTOJSON = allTasks.map(task => task.toJSON());
        
        res.status(200).json(tasksTOJSON);
        return
    }
}
export default new FindAllTasksController()