import { Request, Response } from 'express';
import { CreateUserInput } from '../types/userTypes';
import { createUser, loginUser } from '../models/authModel';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

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

        // JWT Implementation
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT secret is not defined');
        }

        const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ message: 'User logged in successfully', email: email, token: token});
    }
    catch (error: any) {
        res.status(400).json({ error: 'Error logging in' + error.message });
    }
}