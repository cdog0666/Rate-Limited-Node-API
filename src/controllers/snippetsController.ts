import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { createSnippet, getUserIdByEmail, searchSnippetByID } from '../models/snippetsModel';
import { AuthenticatedRequest } from '../types/userTypes';
import { Snippet } from '../types/snippetTypes';
import { NumberLiteralType } from 'typescript';

//Still working on this
export async function createSnippetController(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {

        // From the user info get the email and then get the user id from the database
        const userId = await getUserIdByEmail(req.email!);

        if (!userId) {
            throw new Error('User ID not found');
        }

        // Get the title and content from the request body
        const { title, content, language, is_public} = req.body;

        // Create the snippet in the database
        const snippetID = await createSnippet(title, content, language, is_public, userId);

        snippetID as number;

        res.status(201).json({ snippetID: snippetID, message: 'Snippet created successfully' });
    }
    catch (err:unknown) {
        res.status(500).json({ message: 'Error creating snippet: ' + (err as Error).message });
    }
}

export async function getSnippetByIDController(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const userId = await getUserIdByEmail(req.email!);
        if (!userId) {
            throw new Error('User not found');
        }

        if (typeof req.params.id !== 'string'){
            throw new Error('Invalid snippet ID');
        }

        const snippetId = parseInt(req.params.id);
        
        if (isNaN(snippetId)) {
            throw new Error('Invalid snippet ID');
        }

        const snippet = await searchSnippetByID(snippetId);
        if (!snippet) {
            throw new Error('Snippet not found');
        }

        if (!snippet.is_public && snippet.user_id !== userId) {
            throw new Error('Unauthorized access to private snippet');
        }

        snippet.user_id = null; // Remove user_id before sending
        res.status(200).json({ snippet });
    } catch (err: unknown) {
        res.status(500).json({ message: 'Error fetching snippet: ' + (err as Error).message });
    }
}