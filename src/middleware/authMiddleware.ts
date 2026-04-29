import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticatedRequest } from '../types/userTypes';


dotenv.config();

interface JWTPayload {
    email: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new Error('No token provided');
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: 'JWT secret is not configured' });
        }

        const [scheme, token] = authHeader.split(' ');
        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Invalid authorization header format' });
        }

        const decoded = jwt.verify(token, secret) as JwtPayload;

        req.email = decoded.email; // Attach just the email to the request object

        next();
    }
    catch (err:any) {
        res.status(401).json({ message: 'Unauthorized'+err.message });
    }
};