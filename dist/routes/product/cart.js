"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../../controller/cart");
const authenticate_1 = require("../../middleware/authenticate");
const router = express_1.default.Router();
router.post('/addToCart', authenticate_1.authenticate, cart_1.addToCart);
router.get('/list', authenticate_1.authenticate, cart_1.getCartItem);
router.post('/delete', authenticate_1.authenticate, cart_1.deleteFromCart);
router.post('/update', authenticate_1.authenticate, cart_1.updateCart);
exports.default = router;
