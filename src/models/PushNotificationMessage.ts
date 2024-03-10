import mongoose, { model } from "mongoose";

const pushNotificationMessage = new mongoose.Schema({
    title: {type: String, required: true, },
    body : {type: String, required: true, },
})

const PushNotificationMessage = model('push_notification_message', pushNotificationMessage);

export default PushNotificationMessage;