import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { createHashedPassword, verifyPassword } from "../utils/password";
import jwt from "jsonwebtoken";


export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, userTypeId } = req.body;
    try {
        const hashedPassword = await createHashedPassword(password)
        const user = new User({
            name: name,
            email: email,
            userTypeId: userTypeId,
            password: hashedPassword
        })
        const userDoc = await user.save()
        const userObj = userDoc.toObject();
        delete userObj.password
        res.status(200).json({ success: true, data: userObj, message: 'User Successfully Registered!' })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'User Registration Failed!' })
    }

}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email.toLowerCase()}).select(['_id','name','email','password','userTypeId'])
    if(user){
        const hashedPassword = user.password as string
        const isMatch = await verifyPassword(password, hashedPassword)
        if(isMatch){
            const token = jwt.sign(
                { userId: user._id, email: user.email, userTypeId: user.userTypeId },
                process.env.JWT_SECRET!,
                { expiresIn: '30d' }
            );
            const userObj = user.toObject()
            delete userObj.password
            Object.assign(userObj, {token: token})
            res.status(200).json({ success: true, data: userObj, message: 'User Successfully Login!' })
        }
        else{
            res.status(404).json({ success: false, data: [], message: 'Invalid Login Credentials!' })
        }
    }else{
        res.status(404).json({ success: false, data: [], message: 'User not found' })
    }

}