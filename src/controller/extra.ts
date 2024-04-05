import { NextFunction, Request, Response } from "express";

export const checkServerWorking = (req: Request, res: Response, next:NextFunction) => {
    res.status(200).json(true);
}