import { Task } from "../../entities/task-entitie.js"
import { TaskType } from "../../types/task-types.js"

export interface TaskRepository {
    create: (task: Task) => Promise<void>
    delete: (id: string) => Promise<void>
    update: (task: Task) => Promise<Task>
    findAll: () => Promise<Task[]>
    findById: (id: string) => Promise<Task | null>
    findByType: (type: TaskType) => Promise<Task[] | null>
}