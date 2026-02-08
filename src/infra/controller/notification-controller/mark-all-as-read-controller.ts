import { MarkAllAsReadNotificationFactory } from "@/core/factory/notification-factory/mark-all-as-read-notification-factory.js";
import { CustomRequest } from "@/infra/http/express/types/custom-request.js";
import { Response } from "express";

class markAllAsReadController {
    public async handle(req: CustomRequest, res: Response) {

        const userId = req?.user?.id

        if (!userId) {
            res.status(401);
            return
        }

        const useCase = MarkAllAsReadNotificationFactory.build();
        await useCase.execute({ userId })
        res.status(200).json({ message: 'Notification Read' });
        return;
    }
}
export default new markAllAsReadController()