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
exports.addOrder = exports.getOrders = void 0;
const Order_model_1 = __importDefault(require("../models/Order.model"));
let statusUpdateTimeOut;
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const lstOrder = yield Order_model_1.default.find({ userId: userId }).populate(['products', 'shippingAddress']);
        res.status(200).json({ success: true, data: lstOrder, message: 'Orders fetched Successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: true, data: error, message: 'Failed to fetch orders!' });
    }
});
exports.getOrders = getOrders;
const addOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const { shippingAddress, totalAmount, paymentId, paymentMethod, products, discount, shippingCharges, } = req.body;
        const order = new Order_model_1.default({
            userId: userId,
            orderDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: true, }),
            orderNumber: generateOrderNumber(),
            shippingAddress,
            totalAmount,
            paymentId,
            paymentMethod,
            products,
            discount,
            shippingCharges,
        });
        const tempOrder = yield order.save();
        const orderId = tempOrder._id;
        const newOrder = yield tempOrder.populate(['products', 'shippingAddress']);
        startOrderStatusUpdateScheduler(orderId);
        res.status(200).json({ success: true, data: newOrder, message: 'Order placed Successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: true, data: error, message: 'Failed to place order!' });
    }
    function generateOrderNumber() {
        const prefix = 'VogueV';
        const today = new Date();
        const datePart = today.toISOString().slice(0, 10).replace(/-/g, '');
        const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const orderNumber = `${prefix}${datePart}${randomPart}`;
        return orderNumber;
    }
    function startOrderStatusUpdateScheduler(orderId) {
        const intervalId = setInterval(() => updateOrderStatus(orderId, intervalId), 20 * 1000);
    }
    function updateOrderStatus(orderId, intervalId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_model_1.default.findById(orderId);
                if (!order) {
                    clearInterval(intervalId);
                    return;
                }
                let newStatus = order.orderStatus;
                switch (order.orderStatus) {
                    case 'Placed':
                        newStatus = 'In Process';
                        break;
                    case 'In Process':
                        newStatus = 'Dispatched';
                        break;
                    case 'Dispatched':
                        newStatus = 'In Transit';
                        break;
                    case 'In Transit':
                        newStatus = 'Delivered';
                        break;
                    default:
                        newStatus = order.orderStatus;
                        break;
                }
                if (order.orderStatus == 'Delivered') {
                    clearInterval(intervalId);
                    return;
                }
                const updatedOrder = yield Order_model_1.default.updateOne({ _id: orderId }, { $set: { orderStatus: newStatus } });
            }
            catch (error) {
            }
        });
    }
});
exports.addOrder = addOrder;
