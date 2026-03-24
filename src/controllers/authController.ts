import { Request, Response } from 'express';
import { CreateUserInput } from '../types/user';
import { createUser, loginUser } from '../models/authModel';
import { error } from 'node:console';


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

export async function loginController(req: Request, res: Response): Promise<void> {
    try {
        const {email, password}: CreateUserInput = req.body;

        const isValid:boolean= await loginUser(email,password);

        if (!isValid) {
            throw new Error('Email does not have an existing account');
        }
        res.status(200).json({ message: 'User logged in successfully', email });
    }
    catch (error: any) {
        res.status(400).json({ error: 'Error logging in' + error.message });
    }
}