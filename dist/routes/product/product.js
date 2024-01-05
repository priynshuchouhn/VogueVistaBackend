"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../../controller/product");
const authenticate_1 = require("../../middleware/authenticate");
const authorize_1 = require("../../middleware/authorize");
const router = express_1.default.Router();
router.get('/list', product_1.getAllproducts);
router.post('/detail', product_1.getProductDetail);
router.post('/listByCategory', product_1.getProductsByCategory);
router.get('/trendingArrivals', product_1.getTrendingArrivals);
router.get('/bestSeller', product_1.getBestSeller);
router.get('/popular', product_1.getPopularProducts);
router.post('/add', authenticate_1.authenticate, authorize_1.authorize, product_1.addProduct);
exports.default = router;
