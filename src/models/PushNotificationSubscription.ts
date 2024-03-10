import mongoose, { model } from "mongoose";


const pushNotificationSubscription = new mongoose.Schema({
    endpoint: { type: String, required: true },
    keys: {
        auth: { type: String, required: true },
        p256dh: { type: String, required: true }
    },
});

const PushNotificationSubscription = model('push_notification_subscription', pushNotificationSubscription);

export default PushNotificationSubscription;