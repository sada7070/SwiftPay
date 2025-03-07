import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include userId
interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const header = req.headers["Authorization"];

    try{
        const decoded = jwt.verify(header as string, process.env.JWT_SECRET!) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(403).json({
            message: "Unauthorized: Invalid token."
        });
    }
};

export { AuthenticatedRequest };