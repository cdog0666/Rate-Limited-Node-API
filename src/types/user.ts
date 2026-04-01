import { NumberLiteralType } from "typescript";

export interface CreateUserInput {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
}
