import { NextFunction, Request, Response } from "express";
import PushNotificationMessage from "../models/PushNotificationMessage";



export const addPushNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = req.body;
        const message = await PushNotificationMessage.insertMany(data);        
        res.status(200).json({ success: true, data: message, message: 'Messages added succesfully!' });
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to save message!' });
    }
}