import { StringMappingType } from 'typescript';
import pool from '../config/db';
import bcrypt from 'bcrypt';

export async function createUser(email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createQuery = 'INSERT INTO users (email, password_hash) VALUES ($1, $2)';
    await pool.query(createQuery, [email, hashedPassword]);
}

export async function loginUser(email: string, password: string): Promise<boolean> {
    const query = 'SELECT password_hash FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
        return false;
    }

    const hashedPassword = result.rows[0].password_hash;
    return await bcrypt.compare(password, hashedPassword);
}

