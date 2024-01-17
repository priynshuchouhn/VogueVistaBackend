import { NextFunction, Response } from "express";
import { IRequest } from "../middleware/authenticate";
import Order from "../models/Order.model";
import { Types } from "mongoose";
import Product from "../models/Product";
import { transporter } from "../utils/transporter";
import { sendOrderConfirmationMail } from "../utils/email";


export const getOrders = async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user.userId
    try {
        const lstOrder = await Order.find({ userId: userId }).populate(['products.product', 'shippingAddress']);
        res.status(200).json({ success: true, data: lstOrder, message: 'Orders fetched Successfully!' });
    } catch (error) {
        res.status(404).json({ success: true, data: error, message: 'Failed to fetch orders!' });
    }
}
export const addOrder = async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user.userId
    try {
        const {
            shippingAddress,
            totalAmount,
            paymentId,
            paymentMethod,
            products,
            discount,
            shippingCharges,
        } = req.body

        for (const product of products) {
            const productId = product.productId;
            const productDoc = await Product.findById(productId);
            if (productDoc) {
                product.product = productDoc._id;
            }
        }

        const order = new Order({
            userId: userId,
            orderDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: true, }),
            orderNumber: generateOrderNumber(),
            shippingAddress: shippingAddress,
            totalAmount: totalAmount,
            paymentId: paymentId,
            paymentMethod: paymentMethod,
            products: products,
            discount: discount,
            shippingCharges: shippingCharges,
        })
        const tempOrder = await order.save();
        const orderId = tempOrder._id;
        const newOrder = await tempOrder.populate(['products.product', 'shippingAddress'])
        Object.assign(newOrder, {email : req.user.email});
        const mail = sendOrderConfirmationMail(newOrder)
        // startOrderStatusUpdateScheduler(orderId);
        res.status(200).json({ success: true, data: newOrder, message: 'Order placed Successfully!' });
    } catch (error) {
        res.status(404).json({ success: true, data: error, message: 'Failed to place order!' });
    }

}

function generateOrderNumber() {
    const prefix = 'VogueV';
    const today = new Date();
    const datePart = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const orderNumber = `${prefix}${datePart}${randomPart}`;
    return orderNumber;
}

function startOrderStatusUpdateScheduler(orderId: Types.ObjectId) {
    const intervalId: any = setInterval(() => updateOrderStatus(orderId, intervalId), 60 * 60 * 1000);
}



async function updateOrderStatus(orderId: Types.ObjectId, intervalId: any) {
    try {
        const order = await Order.findById(orderId);
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
        const updatedOrder = await Order.updateOne({ _id: orderId }, { $set: { orderStatus: newStatus } });
    } catch (error: any) {
    }
}