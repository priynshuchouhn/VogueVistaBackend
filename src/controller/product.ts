import { NextFunction, Request, Response } from "express";
import Product from "../models/Product";



export const getAllproducts = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const lstProduct = await Product.find().populate({ path: 'category' }).exec();
        res.status(200).json({ success: true, data: lstProduct, message: "Products fetched successfully!" })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched products" })
    }

}
export const getProductDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.body;
        const product = await Product.findOne({ _id: productId }).populate({ path: 'category' }).exec();
        const similarProducts = await Product.find({ categoryId: product?.categoryId, _id: { $ne: product?._id } })
            .sort({ stockQuantity: -1 })
            .limit(5)
            .populate({ path: 'category' }).exec();
        res.status(200).json({ success: true, data: { product: product, similarProducts: similarProducts }, message: "Product Detail fetched successfully!" })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched product detail" })
    }

}
export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body
        const lstProduct = await Product.find().populate({ path: 'category' });
        const filterProduct = lstProduct.filter(product => (product.category as any).name.toLowerCase() == name)
        res.status(200).json({ success: true, data: filterProduct, message: "Products fetched successfully!" })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched products" })
    }

}
export const getTrendingArrivals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lstProduct = await Product.aggregate([{ $sample: { size: 6 } }])
        const productIds = lstProduct.map(product => product._id);
        const populatedProducts = await Product.find({ _id: { $in: productIds } }).populate('category');
        res.status(200).json({ success: true, data: populatedProducts, message: "Trending Arrivals fetched successfully!" })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched Trending Arrivals" })
    }

}
export const getBestSeller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lstProduct = await Product.find({}).populate({ path: 'category' })
            .sort({ stockQuantity: 1 })
            .limit(5);
        res.status(200).json({ success: true, data: lstProduct, message: "BestSeller Products fetched successfully!" })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched BestSeller Products" })
    }

}
export const getPopularProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lstProduct = await Product.find({}).populate({ path: 'category' })
            .sort({ stockQuantity: -1 })
            .limit(4);
        res.status(200).json({ success: true, data: lstProduct, message: "Popular Products fetched successfully!" })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: "Failed to fetched BestSeller Products" })
    }

}

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, images, price, stockQuantity, categoryId, size, sellerName, } = req.body
        const product = new Product({
            name: name,
            images: images,
            description: description,
            price: price,
            stockQuantity: stockQuantity,
            categoryId: categoryId,
            category: categoryId,
            size: size,
            sellerName: sellerName,
        })
        const newProduct = await product.save();
        const productWithDetail = await newProduct.populate('category');
        res.status(200).json({ success: true, data: productWithDetail, message: 'Product added successfully!' })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to add product!' })

    }
}