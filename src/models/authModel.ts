import pool from '../config/db';
import bcrypt from 'bcrypt';

export async function createUser(email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password_hash) VALUES ($1, $2)';
    await pool.query(query, [email, hashedPassword]);
}