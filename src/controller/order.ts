import { NextFunction, Response } from "express";
import { IRequest } from "../middleware/authenticate";
import Order from "../models/Order.model";
import { Types } from "mongoose";
import Product from "../models/Product";
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

import mongoose from 'mongoose';

export const addOrder = async (req: IRequest, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const userId = req.user.userId;
    try {
        const {
            shippingAddress,
            totalAmount,
            paymentId,
            paymentMethod,
            products,
            discount,
            shippingCharges,
        } = req.body;

        // Validate request data
        if (!shippingAddress || !totalAmount || !paymentId || !paymentMethod || !products) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        // Fetch and populate product details
        for (const product of products) {
            const productId = product.productId;
            const productDoc = await Product.findById(productId).session(session);
            if (!productDoc) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ success: false, message: `Product not found for ID: ${productId}` });
            }
            // Check product availability
            if (product.quantity > productDoc.stockQuantity) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ success: false, message: `Not enough quantity available for product ID: ${productId}` });
            }
            product.product = productDoc._id;

            // Update product quantity
            await Product.findByIdAndUpdate(productId, { $inc: { stockQuantity: -product.quantity } }, { session });
        }

        // Create and save the order
        const order = new Order({
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

        const savedOrder = await order.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Populate additional order details and send confirmation email
        const populatedOrder = await savedOrder.populate(['products.product', 'shippingAddress'])
        Object.assign(populatedOrder, { email: req.user.email });
        const mail = sendOrderConfirmationMail(populatedOrder);

        res.status(200).json({ success: true, data: populatedOrder, message: 'Order placed successfully!' });
    } catch (error) {
        console.error('Error placing order:', error);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ success: false, message: 'Failed to place order.' });
    }
};


function generateOrderNumber() {
    const prefix = 'VogueV';
    const today = new Date();
    const datePart = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const orderNumber = `${prefix}${datePart}${randomPart}`;
    return orderNumber;
}
