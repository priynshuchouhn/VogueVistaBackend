"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorize_1 = require("../../middleware/authorize");
const authenticate_1 = require("../../middleware/authenticate");
const push_notification_1 = require("../../controller/push-notification");
const push_notification_subscription_1 = require("../../controller/push-notification-subscription");
const router = express_1.default.Router();
router.post('/addPushNotificationMessage', authenticate_1.authenticate, authorize_1.authorize, push_notification_1.addPushNotification);
router.post('/addPushNotificationSubscription', push_notification_subscription_1.addPushNotificationSubscription);
exports.default = router;
