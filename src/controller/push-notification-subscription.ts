import { NextFunction, Request, Response } from "express";
import PushNotificationSubscription from '../models/PushNotificationSubscription';


export const addPushNotificationSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { endpoint, keys } = req.body;
        const isSubExist = await PushNotificationSubscription.find({endpoint : endpoint});
        if(isSubExist){
            return res.status(200).json({ success: true, data: [], message: 'Subscription Already Exists' });
        }
        const sub = new PushNotificationSubscription({
            endpoint: endpoint,
            keys: {
                auth: keys.auth,
                p256dh: keys.p256dh
            }
        });
        const newSub = await sub.save();
        fetch('https://vogue-vista-other-services.onrender.com/notify')
       return res.status(200).json({ success: true, data: [], message: 'Subscription added succesfully!' });
    } catch (error) {
        res.status(500).json({ success: false, data: [], message: 'Failed to add subscription!' });

    }
}