import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const dbName = process.env.DB_NAME;
const adminDatabase = process.env.DB_ADMIN_DATABASE || "postgres";

if (!dbName) {
    console.error("Missing DB_NAME environment variable.");
    process.exit(1);
}

const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: adminDatabase,
});

async function createDatabase() {
    try {
        await client.connect();

        const checkResult = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            [dbName],
        );

        if (checkResult.rowCount == null) {
            throw new Error("Failed to check database existence.");
        }                                          

        if (checkResult.rowCount > 0) {
            console.log(`Database \"${dbName}\" already exists.`);
            return;
        }

        await client.query(`CREATE DATABASE \"${dbName}\"`);
        console.log(`Created database \"${dbName}\" successfully.`);

        await client.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL)");
        await client.query("CREATE TABLE IF NOT EXISTS snippets (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, language VARCHAR(50) NOT NULL, is_public BOOLEAN NOT NULL, user_id INTEGER REFERENCES users(id))");
        console.log("Created tables successfully.");
    } catch (error) {
        console.error("Failed to create database:", error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

createDatabase();
