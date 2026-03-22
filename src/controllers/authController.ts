import { Request, Response } from 'express';
import { CreateUserInput } from '../types/user';
import { createUser } from '../models/authModel';


export async function signUpController(req: Request, res: Response): Promise<void> {
    try {
        const { email , password }: CreateUserInput = req.body;

        await createUser(email, password);        

        res.status(201).json({ message: 'User signed up successfully', email });
    }
    catch (error: any) {
        res.status(400).json({ error: 'Error signing up' + error.message });
    }
}