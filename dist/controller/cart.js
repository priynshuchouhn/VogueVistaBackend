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
exports.deleteFromCart = exports.getCartItem = exports.addToCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity, sizeVariant } = req.body;
    const userId = req.user.userId;
    try {
        const cartItem = new Cart_1.default({
            userId: userId,
            productId: productId,
            product: productId,
            quantity: quantity,
            sizeVariant: sizeVariant
        });
        const tempCartItem = yield cartItem.save();
        const newCartItem = yield tempCartItem.populate('product');
        res.status(200).json({ success: true, data: newCartItem, message: 'Item added to cart successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to add item to cart!' });
    }
});
exports.addToCart = addToCart;
const getCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const lstCart = yield Cart_1.default.find({ userId: userId }).populate('product');
        res.status(200).json({ success: true, data: lstCart, message: 'cart items fetched successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to fetch cart items!' });
    }
});
exports.getCartItem = getCartItem;
const deleteFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const cartId = req.body.cartId;
    try {
        const cart = yield Cart_1.default.deleteOne({ _id: cartId, userId: userId }).populate('product');
        res.status(200).json({ success: true, data: true, message: 'cart item deleted successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to delete cart item!' });
    }
});
exports.deleteFromCart = deleteFromCart;
