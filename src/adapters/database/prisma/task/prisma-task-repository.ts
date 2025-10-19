import type { Task } from "core/entities/task-entitie.js";
import type { TaskRepository } from "core/repository/contracts/task-repository.js";
import type {Task as PrismaTask} from "../../../../generated/prisma/index.js"
import {PrismaClient} from "../../../../generated/prisma/index.js"
import { TaskMapper } from "./task-mapper.js";
import type { TaskType } from "core/types/task-types.js";

const prisma = new PrismaClient()

export class PrismaTaskRepository implements TaskRepository{
    public async create(task: Task):Promise<void>{
        const rawTask:PrismaTask = TaskMapper.toPersistence(task)
        await prisma.task.create({
            data: rawTask
        });
    }
    public async findAll():Promise<Task[]>{
        const rawTask:PrismaTask[] = await prisma.task.findMany()
        return rawTask.map(TaskMapper.toDomain);
    }

    public async delete(id: string): Promise<void>{
        await prisma.task.delete({
            where: {id}
        });
    }

    public async findById(id: string): Promise<Task | null>{
        const rawTask:PrismaTask | null = await prisma.task.findUnique({
            where: {id}
        });
        if(!rawTask) return null
        return TaskMapper.toDomain(rawTask)
    }

    public async findByType(type: TaskType):Promise<Task[] | null>{
        const rawTasks:PrismaTask[] | null = await prisma.task.findMany({
            where: {type}
        });

        if(!rawTasks) return null
        return rawTasks.map(TaskMapper.toDomain)
    }

    public async update(task: Task):Promise<Task>{
        const rawTask:PrismaTask = TaskMapper.toPersistence(task)
        await prisma.task.update({
            where: {id: task.getId().toString()},
            data: rawTask
        });
        return TaskMapper.toDomain(rawTask)
    }
}