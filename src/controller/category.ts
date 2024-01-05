import { NextFunction, Request, Response } from "express";
import Category from "../models/Category";


export const getCategoryList = async (req: Request,res: Response,next: NextFunction) => {
    try {
        // const lstCategory = await Category.deleteMany({})
        const lstCategory = await Category.find()
        res.status(200).json({ success: true, data: lstCategory, message: 'Category data fetched!' })
    } catch (error) {
     res.status(404).json({ success: false, data: [], message: 'Failed to get category!' })    
    }
}


export const addCategory = async (req: Request,res: Response,next: NextFunction) => {
    try {
        const { name, description, image} = req.body
        const category = new Category({
            name: name,
            image: image,
            description: description
        })
        console.log(category);
        const newCategory = await category.save();
        res.status(200).json({ success: true, data: newCategory, message: 'Category added successfully!' })
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, data: error, message: 'Failed to add category!' })
        
    }
    
}