import { NextFunction, Response } from "express";
import { IRequest } from "../middleware/authenticate";
import Wishlist from "../models/Wishlist";


export const getWishlistItem = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.userId;
        const lstWishlistItem = await Wishlist.find({ userId: userId }).populate('productId');
        if (lstWishlistItem) {
            return res.status(200).json({ success: true, data: lstWishlistItem, message: 'Wishlist items fetched successfully' });
        }
        return res.status(404).json({ success: false, data: [], message: 'No record found' });
    } catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Failed to get wishlist Item' });
    }

}

export const addWishlistItem = async (req: IRequest, res: Response, next: NextFunction) => {

    try {
        const userId = req.user.userId;
        const { productId } = req.body
        const tempWishlist = new Wishlist({
            userId: userId,
            productId: productId
        });
        const wishlist = await tempWishlist.save();
        if(wishlist){
            return res.status(200).json({ success: true, data: wishlist, message: 'Wishlist items added successfully' });
        }
        return res.status(404).json({ success: false, data: [], message: 'Failed to add wishlist Item' });
    } catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Failed to add wishlist Item' });

    }

}

export const removeFromWishlist = async (req: IRequest, res:Response, next: NextFunction) => {
    try {
        const userId = req.user.userId;
        const { wishlistId} = req.body
        const wishlist = await Wishlist.deleteOne({_id: wishlistId, userId: userId});
        if(wishlist.deletedCount > 0){
            return res.status(200).json({ success: true, data: true, message: 'Wishlist items removed successfully' });   
        }
        return res.status(404).json({ success: false, data: [], message: 'Failed to remove wishlist Item' });
    } catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Failed to remove wishlist Item' });

    }
    
}