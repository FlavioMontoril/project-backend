import { MarkAsReadNotificationFactory } from "@/core/factory/notification-factory/mark-as-read-notification-factory.js";
import { CustomRequest } from "@/infra/http/express/types/custom-request.js";
import { Response } from "express";
import z from "zod"

class markAsReadController {
    public async handle(req: CustomRequest, res: Response) {

        const paramsSchema = z.object({
            recipientId: z.string()
        });

        const { recipientId } = paramsSchema.parse(req.params)
        const userId = req?.user?.id

        if (!userId) {
            res.status(401);
            return
        }

        const useCase = MarkAsReadNotificationFactory.build();
        await useCase.execute({ recipientId, userId })
        res.status(200).json({ message: 'Notification Read' });
        return;
    }
}
export default new markAsReadController()