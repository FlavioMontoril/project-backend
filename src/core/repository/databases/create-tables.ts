import { openDb } from "../../../configDB.js";

export async function initializeDB() {
    const db = await openDb()
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks(
        id TEXT PRIMARY KEY NOT NULL,
        summary VARCHAR(30) NOT NULL,
        description VARCHAR(50) NOT NULL,
        assignee VARCHAR(30),
        reporter VARCHAR(30) NOT NULL,
        type VARCHAR(15) NOT NULL,
        status VARCHAR(150) NOT NULL,
        created_at DATE NOT NULL,
        updated_at DATE,
        user_id TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
        )`);
    console.log('Table "tasks" configured')

    await db.exec(`
        CREATE TABLE IF NOT EXISTS roles(
        id TEXT PRIMARY KEY NOT NULL,
        name VARCHAR(30) NOT NULL,
        description VARCHAR(30) NOT NULL,
        created_at DATE NOT NULL,
        updated_at DATE
        )`);
    console.log('Table "roles" configured')

    await db.run(`
        CREATE TABLE IF NOT EXISTS users(
        id TEXT PRIMARY KEY NOT NULL,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(40) NOT NULL,
        passwordHash VARCHAR(12) NOT NULL,
        department VARCHAR(20) NOT NULL,
        roleId TEXT NOT NULL,
        created_at DATE NOT NULL,
        updated_at DATE)
        `);
    console.log('Table "users" configured')
}