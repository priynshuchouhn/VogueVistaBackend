"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middleware/authenticate");
const payment_1 = require("../controller/payment");
const router = express_1.default.Router();
router.post('/createPaymentIntent', authenticate_1.authenticate, payment_1.createPaymentIntent);
exports.default = router;
