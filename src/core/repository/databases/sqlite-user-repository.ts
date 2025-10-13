import { openDb } from "configDB.js";
import { User } from "core/entities/user-entitie.js";

export class SQLiteUserRepository {
    public async create(user: User): Promise<void> {
        const db = await openDb()
        const query = 'INSERT INTO users(id, name, email, passwordHash, department, roleId, created_at, updated_at)' +
            'VALUES(?, ?, ?, ?, ?, ?, ?, ?)'
        await db.run(query, [
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPasswordHash(),
            user.getDepartment(),
            user.getRoleId(),
            user.getCreatedAt().toISOString(),
            user.getUpdatedAt(),
        ]);
    }
    public async delete(id: string): Promise<void> {
        const db = await openDb()
        const query = 'DELETE FROM users WHERE id = ?'
        await db.run(query, [id]);
    }

    public async update(user: User): Promise<User> {
        const db = await openDb()
        const query = 'UPDATE users SET name = ?, email = ?, passwordHash = ?, department = ?, roleId = ?, updated_at = ? WHERE id = ?'
        await db.run(query, [
            user.getName(),
            user.getEmail(),
            user.getPasswordHash(),
            user.getDepartment(),
            user.getRoleId(),
            user.getUpdatedAt()?.toISOString(),
            user.getId(),
        ]);
        return user
    }
    public async findAll(): Promise<User[]> {
        const db = await openDb()
        const query = 'SELECT * FROM users'
        const rowData = await db.all(query)
        const queryTask = 'SELECT * FROM tasks'
        const tasksData = await db.all(queryTask)
        
        const users = rowData.map((row: any) => {
            const tasks = tasksData.filter((task) => task.user_id === row.id)
            return User.build({
                id: row.id,
                name: row.name,
                email: row.email,
                passwordHash: row.passwordHash,
                department: row.department,
                roleId: row.roleId,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
                tasks: tasks
            })
        })
        return users
    }

    public async findById(id: string): Promise<User> {
        const db = await openDb()
        const query = 'SELECT * FROM users WHERE id = ?'
        const row = await db.get(query, [id])

        const querySelect = 'SELECT * FROM tasks WHERE user_id = ?'
        const tasks = await db.all(querySelect, [id])
        const user = User.build({
            id: row.id,
            name: row.name,
            email: row.email,
            passwordHash: row.passwordHash,
            department: row.department,
            roleId: row.roleId,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            tasks: tasks,
        });
        return user
    }
    public async findByEmail(email: string): Promise<User | null> {
        const db = await openDb()
        const query = 'SELECT * FROM users WHERE email = ?'
        const row = await db.get(query, [email])
        if (!row) return null
        const user = User.build({
            id: row.id,
            name: row.name,
            email: row.email,
            passwordHash: row.passwordHash,
            department: row.department,
            roleId: row.roleId,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            tasks: row.tasks
        });
        return user
    }
}