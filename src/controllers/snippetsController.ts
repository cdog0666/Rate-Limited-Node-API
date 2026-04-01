import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { getSnippetsByUserId } from '../models/snippetsModel';

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}


export async function createSnippetController(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const { title, content } = req.body;

        const id =  

        res.status(201).json({ message: req.user})
    }
    catch (err:any) {
        res.status(500).json({ message: 'Error creating snippet: ' + err.message });
    }
}