"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_1 = require("../../controller/wishlist");
const authenticate_1 = require("../../middleware/authenticate");
const router = express_1.default.Router();
router.get('/list', authenticate_1.authenticate, wishlist_1.getWishlistItem);
router.post('/add', authenticate_1.authenticate, wishlist_1.addWishlistItem);
router.post('/delete', authenticate_1.authenticate, wishlist_1.removeFromWishlist);
exports.default = router;
