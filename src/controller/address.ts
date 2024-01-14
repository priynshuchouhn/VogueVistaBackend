import { NextFunction, Response } from "express";
import { IRequest } from "../middleware/authenticate";
import Address from "../models/Address";



export const getAllAddresses = async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user.userId
    try {
        const lstAddress = await Address.find({ userId: userId });
        res.status(200).json({ success: true, data: lstAddress, message: 'Address fetched successfully!' });
    } catch (error) {
        res.status(404).json({ success: false, data: [], message: 'Failed to fetch address!' });
    }
}

export const addAddress = async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.user.userId
    try {
        const { name, phone, addressType, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;
        if(isDefault){
            const updatedAddress = await Address.updateMany({ userId: userId }, { $set: { isDefault: false } });
        }
        const address = new Address({
                userId: userId,
                addressType:addressType,
                name: name,
                phone: phone,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                state: state,
                pincode: pincode,
                isDefault: isDefault,
            });
            const newAddress = await address.save();
            res.status(200).json({ success: true, data: newAddress, message: 'Address added succesfully!' });
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to add address!' });
    }
}