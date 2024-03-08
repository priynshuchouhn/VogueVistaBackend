import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { createHashedPassword, verifyPassword } from "../utils/password";
import jwt from "jsonwebtoken";


export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, userTypeId } = req.body;
    if (!name || !email || !password || !userTypeId) {
        return res.status(404).json({ success: true, data: [], message: 'Required field missing' })
    }
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
        return res.status(200).json({ success: true, data: userObj, message: 'User Successfully Registered!' })
    } catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Internal Server Error' })
    }

}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() }).select(['_id', 'name', 'email', 'password', 'userTypeId', 'profileImage'])
        if (user) {
            const hashedPassword = user.password as string
            const isMatch = await verifyPassword(password, hashedPassword)
            if (isMatch) {
                const token = jwt.sign(
                    { userId: user._id, email: user.email, userTypeId: user.userTypeId },
                    process.env.JWT_SECRET!,
                    { expiresIn: '30d' }
                );
                const userObj = user.toObject()
                delete userObj.password
                Object.assign(userObj, { token: token })
                res.status(200).json({ success: true, data: userObj, message: 'User Successfully Login!' })
            }
            else {
                return res.status(404).json({ success: false, data: [], message: 'Invalid Login Credentials!' })
            }
        } else {
            return res.status(404).json({ success: false, data: [], message: 'User not found' })
        }
    } catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Internal Server Error' })
    }


}


export const loginInWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { displayName, email, phoneNumber, photoURL, uid } = req.body;
        if (!displayName || !email || !uid) {
            return res.status(404).json({ success: false, data: [], message: 'Required fields missing' })
        }
        const user = await User.findOne({ email: email.toLowerCase() }).select(['_id', 'uid', 'name', 'email', 'userTypeId', 'profileImage'])
        if (!user) {
            const user = new User({
                name: displayName,
                email: email,
                mobile: phoneNumber,
                profileImage: photoURL,
                uid: uid
            })
            const userDoc = await user.save()
            const token = jwt.sign(
                { userId: userDoc._id, email: userDoc.email, userTypeId: userDoc.userTypeId },
                process.env.JWT_SECRET!,
                { expiresIn: '30d' }
            );
            const userObj = user.toObject()
            Object.assign(userObj, { token: token })
            return res.status(200).json({ success: true, data: userObj, message: 'User Successfully Login!' })
        }else{
            if(user.uid == uid){
                const token = jwt.sign(
                    { userId: user._id, email: user.email, userTypeId: user.userTypeId },
                    process.env.JWT_SECRET!,
                    { expiresIn: '30d' }
                );
                const userObj = user.toObject()
                Object.assign(userObj, { token: token })
                return res.status(200).json({ success: true, data: userObj, message: 'User Successfully Login!' })
            }else{
                return res.status(404).json({ success: false, data: [], message: 'Please Login with Email and Password' })
            }
        }
    } catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Internal Server Error' })
    }
}