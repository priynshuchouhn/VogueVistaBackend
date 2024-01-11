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
exports.addProduct = exports.getPopularProducts = exports.getBestSeller = exports.getTrendingArrivals = exports.getProductsByCategory = exports.getProductDetail = exports.getAllproducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getAllproducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lstProduct = yield Product_1.default.find().populate({ path: 'category' }).exec();
        res.status(200).json({ success: true, data: lstProduct, message: "Products fetched successfully!" });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched products" });
    }
});
exports.getAllproducts = getAllproducts;
const getProductDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        const product = yield Product_1.default.findOne({ _id: productId }).populate({ path: 'category' }).exec();
        const similarProducts = yield Product_1.default.find({ categoryId: product === null || product === void 0 ? void 0 : product.categoryId, _id: { $ne: product === null || product === void 0 ? void 0 : product._id } })
            .sort({ stockQuantity: -1 })
            .limit(5)
            .populate({ path: 'category' }).exec();
        res.status(200).json({ success: true, data: { product: product, similarProducts: similarProducts }, message: "Product Detail fetched successfully!" });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched product detail" });
    }
});
exports.getProductDetail = getProductDetail;
const getProductsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const lstProduct = yield Product_1.default.find().populate({ path: 'category' });
        const filterProduct = lstProduct.filter(product => product.category.name.toLowerCase() == name);
        res.status(200).json({ success: true, data: filterProduct, message: "Products fetched successfully!" });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched products" });
    }
});
exports.getProductsByCategory = getProductsByCategory;
const getTrendingArrivals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lstProduct = yield Product_1.default.aggregate([{ $sample: { size: 6 } }]);
        const productIds = lstProduct.map(product => product._id);
        const populatedProducts = yield Product_1.default.find({ _id: { $in: productIds } }).populate('category');
        res.status(200).json({ success: true, data: populatedProducts, message: "Trending Arrivals fetched successfully!" });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched Trending Arrivals" });
    }
});
exports.getTrendingArrivals = getTrendingArrivals;
const getBestSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lstProduct = yield Product_1.default.find({}).populate({ path: 'category' })
            .sort({ stockQuantity: 1 })
            .limit(5);
        res.status(200).json({ success: true, data: lstProduct, message: "BestSeller Products fetched successfully!" });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched BestSeller Products" });
    }
});
exports.getBestSeller = getBestSeller;
const getPopularProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lstProduct = yield Product_1.default.find({}).populate({ path: 'category' })
            .sort({ stockQuantity: -1 })
            .limit(4);
        res.status(200).json({ success: true, data: lstProduct, message: "Popular Products fetched successfully!" });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched BestSeller Products" });
    }
});
exports.getPopularProducts = getPopularProducts;
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, images, price, stockQuantity, categoryId, size, sellerName, } = req.body;
        const product = new Product_1.default({
            name: name,
            images: images,
            description: description,
            price: price,
            stockQuantity: stockQuantity,
            categoryId: categoryId,
            category: categoryId,
            size: size,
            sellerName: sellerName,
        });
        const newProduct = yield product.save();
        const productWithDetail = yield newProduct.populate('category');
        res.status(200).json({ success: true, data: productWithDetail, message: 'Product added successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to add product!' });
    }
});
exports.addProduct = addProduct;
