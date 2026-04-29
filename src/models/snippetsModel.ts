import pool from '../config/db';
import { Snippet } from '../types/snippetTypes';


export async function getUserIdByEmail(email: string): Promise<number | null> {
    const query = 'SELECT id FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0].id as number;
}

export async function createSnippet(title: string, content: string, language: string, is_public: boolean, userId: number): Promise<number | void> {
    const createQuery = 'INSERT INTO snippets (title, content, language, is_public, user_id) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(createQuery, [title, content, language, is_public, userId]);

    const getQuery = 'SELECT id FROM snippets WHERE title = $1 AND user_id = $2';
    const result = await pool.query(getQuery, [title, userId]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create snippet');
    }

    return result.rows[0].id as number;
}

export async function searchSnippetByID(id: number): Promise<Snippet | void> {
    const query = 'SELECT title, content, language, is_public, created_at FROM snippets WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
        throw new Error('Snippet not found');
    }

    return result.rows[0] as Snippet;
}