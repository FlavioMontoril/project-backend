import { openDb } from "configDB.js";
import { Task } from "core/entities/task-entitie.js";
import { TaskType } from "core/types/task-types.js";

export class SQLiteTaskRepository {
    public async create(task: Task): Promise<void> {
        const db = await openDb()
        const query = 'INSERT INTO tasks(id, summary, description, assignee, reporter, type, status, created_at, updated_at, user_id)' +
            'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        await db.run(query, [
            task.getId(),
            task.getSummary(),
            task.getDescription(),
            task.getAssignee(),
            task.getReporter(),
            task.getType(),
            task.getStatus(),
            task.getCreatedAt().toISOString(),
            task.getUpdatedAt(),
            task.getUserId(),
        ]);
    }

    public async update(task: Task): Promise<Task> {
        const db = await openDb()
        const query = 'UPDATE tasks SET summary = ?, description = ?, assignee = ?, reporter = ?, type = ?, status = ?, updated_at = ?, user_id = ? WHERE id = ?'
        await db.run(query, [
            task.getSummary(),
            task.getDescription(),
            task.getAssignee(),
            task.getReporter(),
            task.getType(),
            task.getStatus(),
            task.getUpdatedAt()?.toISOString(),
            task.getId(),
        ]);
        return task
    }

    public async delete(id: string): Promise<void> {
        const db = await openDb()
        const query = 'DELETE FROM tasks WHERE id = ?'
        await db.run(query, [id])
    }

    public async findAll(): Promise<Task[]> {
        const db = await openDb()
        const query = 'SELECT * FROM tasks'
        const rowData = await db.all(query)
        const allTasks = rowData.map((row: any) => Task.build({
            id: row.id,
            summary: row.summary,
            description: row.description,
            assignee: row.assignee,
            type: row.type,
            status: row.status,
            reporter: row.reporter,
            createdAt: new Date(row.created_at),
            updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
            userId: row.user_id,
        }));
        return allTasks;
    }
    public async findById(id: string): Promise<Task> {
        const db = await openDb()
        const query = 'SELECt * FROM tasks WHERE id = ?'
        const row = await db.get(query, [id])
        const task = Task.build({
            id: row.id,
            summary: row.summary,
            description: row.description,
            assignee: row.assignee,
            type: row.type,
            status: row.status,
            reporter: row.reporter,
            createdAt: new Date(row.created_at),
            updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
            userId: row.user_id,
        });
        return task;
    }

    public async findByType(type: TaskType): Promise<Task[]> {
        const db = await openDb()
        const query = 'SELECT FROM tasks WHERE type = ?'
        const rowData = db.all(query, [type])
        const tasks = (await rowData).map((row: any) => Task.build({
            id: row.id,
            summary: row.summary,
            description: row.description,
            assignee: row.assignee,
            type: row.type,
            status: row.status,
            reporter: row.reporter,
            createdAt: new Date(row.created_at),
            updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
            userId: row.userId,
        }))
        return tasks
    }
}