"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middleware/authenticate");
const order_1 = require("../controller/order");
const router = express_1.default.Router();
router.get('/getOrders', authenticate_1.authenticate, order_1.getOrders);
router.post('/add', authenticate_1.authenticate, order_1.addOrder);
exports.default = router;
