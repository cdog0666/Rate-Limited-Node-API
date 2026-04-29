import { NumberLiteralType } from "typescript";
import { Request } from "express";


export interface CreateUserInput {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
}

export interface AuthenticatedRequest extends Request {
    email?: string;  // Now just the email as a string
}