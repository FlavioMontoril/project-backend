import { MakeCreateTaskUseCaseFactory } from "@/core/factory/task-factory/make-create-task-use-case-factory.js";
import { TaskType } from "@/core/types/task-types.js"
import { CustomRequest } from "@/infra/http/express/types/custom-request.js";
import { Response } from "express"
import z from "zod"
class CreateTaskController {
    public async handle(req: CustomRequest, res: Response) {

        const bodySchema = z.object({
            summary: z.string(),
            description: z.string(),
            type: z.nativeEnum(TaskType),
            createdAt: z.coerce.date().optional(),
            assigneeId: z.union([z.string(), z.array(z.string())])
                .optional()
                .transform((val) => {
                    if (!val) return undefined;
                    return typeof val === "string" ? [val] : val;
                }),
        });

        const body = bodySchema.parse(req.body);
        const userId = req.user!.id;
        const useCase = MakeCreateTaskUseCaseFactory.build();
        await useCase.execute({ ...body, userId });

        return res.status(201).json({ message: 'Task Created Succesfully' })
    }
}
export default new CreateTaskController()