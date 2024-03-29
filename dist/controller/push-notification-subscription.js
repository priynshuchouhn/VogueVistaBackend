"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPushNotificationSubscription = void 0;
const PushNotificationSubscription_1 = __importDefault(require("../models/PushNotificationSubscription"));
const addPushNotificationSubscription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { endpoint, keys } = req.body;
        const isSubExist = yield PushNotificationSubscription_1.default.findOne({ endpoint: endpoint });
        if (isSubExist) {
            return res.status(200).json({ success: true, data: [], message: 'Subscription Already Exists' });
        }
        const sub = new PushNotificationSubscription_1.default({
            endpoint: endpoint,
            keys: {
                auth: keys.auth,
                p256dh: keys.p256dh
            }
        });
        const newSub = yield sub.save();
        fetch('https://vogue-vista-other-services.onrender.com/notify');
        return res.status(200).json({ success: true, data: [], message: 'Subscription added succesfully!' });
    }
    catch (error) {
        res.status(500).json({ success: false, data: [], message: 'Failed to add subscription!' });
    }
});
exports.addPushNotificationSubscription = addPushNotificationSubscription;
