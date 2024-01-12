import { NextFunction, Request, Response } from "express";
import Cart from "../models/Cart";
import { IRequest } from "../middleware/authenticate";



export const addToCart = async (req: IRequest, res: Response, next: NextFunction) => {
    const { productId, quantity, sizeVariant } = req.body;
    const userId = req.user.userId
    try {
        const cartItem = new Cart({
            userId: userId,
            productId: productId,
            product: productId,
            quantity: quantity,
            sizeVariant: sizeVariant
        });
        const tempCartItem = await cartItem.save();
        const newCartItem = await tempCartItem.populate('product');
        res.status(200).json({ success: true, data: newCartItem, message: 'Item added to cart successfully!' })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to add item to cart!' })
    }
}
export const updateCart = async (req: IRequest, res: Response, next: NextFunction) => {
    const { cartId, quantity} = req.body;
    const userId = req.user.userId
    try {
        const tempCartItem = await Cart.findOneAndUpdate({_id : cartId, userId: userId}, { $set: { quantity: quantity } }, { new: true });
        const newCartItem = tempCartItem ? await tempCartItem.populate('product') : null;
        res.status(200).json({ success: true, data: newCartItem, message: 'Item updated in cart successfully!' })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to update item in cart!' })
    }
}
export const getCartItem = async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user.userId
    try {
        const lstCart = await Cart.find({userId: userId}).populate('product');
        res.status(200).json({ success: true, data: lstCart, message: 'cart items fetched successfully!' })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to fetch cart items!' })
    }
}
export const deleteFromCart = async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user.userId
    const cartId = req.body.cartId;
    try {
        const cart = await Cart.deleteOne({_id: cartId, userId: userId});
        res.status(200).json({ success: true, data: true, message: 'cart item deleted successfully!' })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to delete cart item!' })
    }
}