import { NextFunction, Request, Response } from "express";
import { IRequest } from "./authenticate";

export const authorize = (req: IRequest, res: Response, next: NextFunction) => {
    if(req.user.userTypeId == 1){
        next();
    }else{
        res.status(401).json({ success: false, data: false, message: 'Not a Admin Account' })
    }
}