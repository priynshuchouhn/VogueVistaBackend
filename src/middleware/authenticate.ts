import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { Schema } from 'mongoose';

export interface IRequest extends Request {
    user?:  any,
}

export const authenticate = (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, data: false, message: 'Unauthorized User!' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, data: error, message: 'Unauthorized User!' });
    }
};