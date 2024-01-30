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
exports.removeFromWishlist = exports.addWishlistItem = exports.getWishlistItem = void 0;
const Wishlist_1 = __importDefault(require("../models/Wishlist"));
const getWishlistItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const lstWishlistItem = yield Wishlist_1.default.find({ userId: userId }).populate('productId');
        if (lstWishlistItem) {
            return res.status(200).json({ success: true, data: lstWishlistItem, message: 'Wishlist items fetched successfully' });
        }
        return res.status(404).json({ success: false, data: [], message: 'No record found' });
    }
    catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Failed to get wishlist Item' });
    }
});
exports.getWishlistItem = getWishlistItem;
const addWishlistItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const { productId } = req.body;
        const tempWishlist = new Wishlist_1.default({
            userId: userId,
            productId: productId
        });
        const wishlist = yield tempWishlist.save();
        if (wishlist) {
            return res.status(200).json({ success: true, data: wishlist, message: 'Wishlist items added successfully' });
        }
        return res.status(404).json({ success: false, data: [], message: 'Failed to add wishlist Item' });
    }
    catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Failed to add wishlist Item' });
    }
});
exports.addWishlistItem = addWishlistItem;
const removeFromWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const { wishlistId } = req.body;
        const wishlist = yield Wishlist_1.default.deleteOne({ _id: wishlistId, userId: userId });
        if (wishlist.deletedCount > 0) {
            return res.status(200).json({ success: true, data: true, message: 'Wishlist items removed successfully' });
        }
        return res.status(404).json({ success: false, data: [], message: 'Failed to remove wishlist Item' });
    }
    catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Failed to remove wishlist Item' });
    }
});
exports.removeFromWishlist = removeFromWishlist;
