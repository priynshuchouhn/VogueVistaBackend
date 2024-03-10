import express from "express";
import { authorize } from "../../middleware/authorize";
import { authenticate } from "../../middleware/authenticate";
import { addPushNotification } from "../../controller/push-notification";
import { addPushNotificationSubscription } from "../../controller/push-notification-subscription";

const router = express.Router()

router.post('/addPushNotificationMessage', authenticate, authorize, addPushNotification)
router.post('/addPushNotificationSubscription', addPushNotificationSubscription)

export default router;