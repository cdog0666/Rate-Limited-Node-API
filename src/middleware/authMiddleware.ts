import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
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

        const decoded = jwt.verify(token, secret) as string | JwtPayload;
        console.log(decoded);

        req.user = decoded; // Attach user info to the request object

        next();
    }
    catch (err:any) {
        res.status(401).json({ message: 'Unauthorized'+err.message });
    }
};