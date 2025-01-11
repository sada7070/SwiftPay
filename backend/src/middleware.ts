import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const decoded = jwt.verify(header as string, process.env.JWT_SECRET!);

    if(decoded) {
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({
            message: "Unauthorized: Invalid token."
        })
    }
}   