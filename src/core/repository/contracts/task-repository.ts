import type { Task } from "../../entities/task-entitie.js"
import type { TaskType } from "../../types/task-types.js"

export interface TaskRepository {
    create: (task: Task) => Promise<void>
    update: (task: Task) => Promise<Task>
    delete: (id: string) => Promise<void>
    findAll: () => Promise<Task[]>
    findById: (id: string) => Promise<Task>
    findByType: (type: TaskType) => Promise<Task[]>
}