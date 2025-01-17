import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include userId
interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, process.env.JWT_SECRET!) as JwtPayload;

    if(decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({
            message: "Unauthorized: Invalid token."
        })
    }
}

export default AuthenticatedRequest;