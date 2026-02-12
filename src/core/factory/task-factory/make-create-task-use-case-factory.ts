import { PrismaTaskRepository } from "@/adapters/database/prisma/task/prisma-task-repository.js";
import { EventEmitterDispatcher } from "@/core/events/event-emitter-dispatcher.js";
import { CreateTaskUseCase } from "@/core/use-case/task-use-case/create-task-use-case.js";

export class MakeCreateTaskUseCaseFactory {
    public static build() {
        const repository = new PrismaTaskRepository()
        const dispatcher = new EventEmitterDispatcher();
        return new CreateTaskUseCase(repository, dispatcher)
    }
}