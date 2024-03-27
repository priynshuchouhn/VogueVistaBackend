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
const Product_1 = __importDefault(require("../models/Product"));
const email_1 = require("../utils/email");
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const lstOrder = yield Order_model_1.default.find({ userId: userId }).populate(['products.product', 'shippingAddress']);
        res.status(200).json({ success: true, data: lstOrder, message: 'Orders fetched Successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: true, data: error, message: 'Failed to fetch orders!' });
    }
});
exports.getOrders = getOrders;
// export const addOrder = async (req: IRequest, res: Response, next: NextFunction) => {
//     const userId = req.user.userId
//     try {
//         const {
//             shippingAddress,
//             totalAmount,
//             paymentId,
//             paymentMethod,
//             products,
//             discount,
//             shippingCharges,
//         } = req.body
//         for (const product of products) {
//             const productId = product.productId;
//             const productDoc = await Product.findById(productId);
//             if (productDoc) {
//                 product.product = productDoc._id;
//             }
//         }
//         const order = new Order({
//             userId: userId,
//             orderDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: true, }),
//             orderNumber: generateOrderNumber(),
//             shippingAddress: shippingAddress,
//             totalAmount: totalAmount,
//             paymentId: paymentId,
//             paymentMethod: paymentMethod,
//             products: products,
//             discount: discount,
//             shippingCharges: shippingCharges,
//         })
//         const tempOrder = await order.save();
//         const orderId = tempOrder._id;
//         const newOrder = await tempOrder.populate(['products.product', 'shippingAddress'])
//         Object.assign(newOrder, {email : req.user.email});
//         const mail = sendOrderConfirmationMail(newOrder)
//         res.status(200).json({ success: true, data: newOrder, message: 'Order placed Successfully!' });
//     } catch (error) {
//         res.status(404).json({ success: true, data: error, message: 'Failed to place order!' });
//     }
// }
const mongoose_1 = __importDefault(require("mongoose"));
const addOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const userId = req.user.userId;
    try {
        const { shippingAddress, totalAmount, paymentId, paymentMethod, products, discount, shippingCharges, } = req.body;
        // Validate request data
        if (!shippingAddress || !totalAmount || !paymentId || !paymentMethod || !products) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }
        // Fetch and populate product details
        for (const product of products) {
            const productId = product.productId;
            const productDoc = yield Product_1.default.findById(productId).session(session);
            if (!productDoc) {
                yield session.abortTransaction();
                session.endSession();
                return res.status(404).json({ success: false, message: `Product not found for ID: ${productId}` });
            }
            // Check product availability
            if (product.quantity > productDoc.stockQuantity) {
                yield session.abortTransaction();
                session.endSession();
                return res.status(400).json({ success: false, message: `Not enough quantity available for product ID: ${productId}` });
            }
            product.product = productDoc._id;
            // Update product quantity
            yield Product_1.default.findByIdAndUpdate(productId, { $inc: { stockQuantity: -product.quantity } }, { session });
        }
        // Create and save the order
        const order = new Order_model_1.default({
            userId: userId,
            orderDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: true }),
            orderNumber: generateOrderNumber(),
            shippingAddress: shippingAddress,
            totalAmount: totalAmount,
            paymentId: paymentId,
            paymentMethod: paymentMethod,
            products: products,
            discount: discount,
            shippingCharges: shippingCharges,
        });
        const savedOrder = yield order.save({ session });
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        // Populate additional order details and send confirmation email
        const populatedOrder = yield savedOrder.populate(['products.product', 'shippingAddress']);
        Object.assign(populatedOrder, { email: req.user.email });
        const mail = (0, email_1.sendOrderConfirmationMail)(populatedOrder);
        res.status(200).json({ success: true, data: populatedOrder, message: 'Order placed successfully!' });
    }
    catch (error) {
        console.error('Error placing order:', error);
        yield session.abortTransaction();
        session.endSession();
        res.status(500).json({ success: false, message: 'Failed to place order.' });
    }
});
exports.addOrder = addOrder;
function generateOrderNumber() {
    const prefix = 'VogueV';
    const today = new Date();
    const datePart = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const orderNumber = `${prefix}${datePart}${randomPart}`;
    return orderNumber;
}
