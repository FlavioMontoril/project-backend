import { openDb } from "configDB.js";
import { Role } from "core/entities/role-entitie.js";
import { RoleOptions } from "core/types/role-types.js";

export class SQLiteRoleRepository {
    public async create(role: Role): Promise<void> {
        const db = await openDb()
        const query = 'INSERT INTO roles(id, name, description, created_at, updated_at)' +
            'VALUES(?, ?, ?, ?, ?)'
        await db.run(query, [
            role.getId(),
            role.getName(),
            role.getDescription(),
            role.getCreatedAt().toISOString(),
            role.getUpdatedAt(),
        ]);
    }

    public async update(role: Role): Promise<Role> {
        const db = await openDb()
        const query = 'UPDATE roles SET name = ?, description = ?, updated_at = ? WHERE id = ?'
        await db.run(query, [
            role.getName(),
            role.getDescription(),
            role.getUpdatedAt(),
            role.getId(),
        ]);
        return role
    }

    public async delete(id: string): Promise<void> {
        const db = await openDb()
        const query = 'DELETE FROM roles WHERE id = ?'
        await db.run(query, [id])
    }

    public async findAll(): Promise<Role[]> {
        const db = await openDb()
        const query = 'SELECT * FROM roles'
        const rowData = await db.all(query)
        
        const allRoles = rowData.map((row: any) => Role.build({
            id: row.id,
            name: row.name,
            description: row.description,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
        return allRoles
    }

    public async findById(id: string): Promise<Role | null> {
        const db = await openDb()
        const query = 'SELECT * FROM roles WHERE id = ?'
        const row = await db.get(query, [id])
        if(!row) return null
        const role = Role.build({
            id: row.id,
            name: row.name,
            description: row.description,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        })
        return role
    }

    public async findByOptions(roleOptions: RoleOptions): Promise<Role | null> {
        const db = await openDb()
        const query = 'SELECT * FROM roles WHERE name = ? LIMIT 1'
        const row = await db.get(query, [roleOptions])
        if(!row) return null
        const role = Role.build({
            id: row.id,
            name: row.name as RoleOptions,
            description: row.description,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        });
        return role
    }
}