import { prisma } from "@/infra/database/client.js";
import { TasksUsers } from "@/core/entities/tasks-users-entity.js";
import { TasksUsersRepository } from "@/core/repository/contracts/tasks-users-repository.js";
import { TasksUsersMapper } from "./tasks-users-mapper.js";
import { TasksUser as PrismaTasksUser } from "@/generated/prisma/index.js";

export class PrismaTasksUsersRepository implements TasksUsersRepository {

    public async save(data: TasksUsers): Promise<void> {
        const raw: PrismaTasksUser = TasksUsersMapper.toPersistence(data)
        await prisma.tasksUser.createMany({
            data: raw,
            skipDuplicates: true,
        })
    }

    public async findAll(): Promise<TasksUsers[]> {
        const rows: PrismaTasksUser[] = await prisma.tasksUser.findMany();

        return rows.map(TasksUsersMapper.toDomain);
    }

    public async findById(id: string): Promise<TasksUsers | null> {
        const row = await prisma.tasksUser.findUnique({
            where: { id },
        });

        if (!row) return null;
        return TasksUsersMapper.toDomain(row);
    }

    public async findByTaskAndAssignee(
        taskId: string,
        assigneeId: string
    ): Promise<TasksUsers | null> {

        const row = await prisma.tasksUser.findFirst({
            where: {
                taskId,
                assigneeId,
            },
        });

        if (!row) return null;
        return TasksUsersMapper.toDomain(row);
    }
}
