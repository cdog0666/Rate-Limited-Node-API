import pool from '../config/db';

export async function getUserIdByEmail(email: string): Promise<number | null> {
    const query = 'SELECT id FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0].id as number;
}

export async function createSnippet(title: string, content: string, userId: number): Promise<number | void> {
    const createQuery = 'INSERT INTO snippets (title, content, user_id) VALUES ($1, $2, $3)';
    await pool.query(createQuery, [title, content, userId]);

    const getQuery = 'SELECT id FROM snippets WHERE title = $1 AND user_id = $2';
    const result = await pool.query(getQuery, [title, userId]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create snippet');
    }

    return result.rows[0].id as number;
}