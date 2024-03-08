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
exports.loginInWithGoogle = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, userTypeId } = req.body;
    if (!name || !email || !password || !userTypeId) {
        return res.status(404).json({ success: true, data: [], message: 'Required field missing' });
    }
    try {
        const hashedPassword = yield (0, password_1.createHashedPassword)(password);
        const user = new User_1.default({
            name: name,
            email: email,
            userTypeId: userTypeId,
            password: hashedPassword
        });
        const userDoc = yield user.save();
        const userObj = userDoc.toObject();
        delete userObj.password;
        return res.status(200).json({ success: true, data: userObj, message: 'User Successfully Registered!' });
    }
    catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Internal Server Error' });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email: email.toLowerCase() }).select(['_id', 'name', 'email', 'password', 'userTypeId', 'profileImage']);
        if (user) {
            const hashedPassword = user.password;
            const isMatch = yield (0, password_1.verifyPassword)(password, hashedPassword);
            if (isMatch) {
                const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, userTypeId: user.userTypeId }, process.env.JWT_SECRET, { expiresIn: '30d' });
                const userObj = user.toObject();
                delete userObj.password;
                Object.assign(userObj, { token: token });
                res.status(200).json({ success: true, data: userObj, message: 'User Successfully Login!' });
            }
            else {
                return res.status(404).json({ success: false, data: [], message: 'Invalid Login Credentials!' });
            }
        }
        else {
            return res.status(404).json({ success: false, data: [], message: 'User not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Internal Server Error' });
    }
});
exports.login = login;
const loginInWithGoogle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { displayName, email, phoneNumber, photoURL, uid } = req.body;
        if (!displayName || !email || !uid) {
            return res.status(404).json({ success: false, data: [], message: 'Required fields missing' });
        }
        const user = yield User_1.default.findOne({ email: email.toLowerCase() }).select(['_id', 'uid', 'name', 'email', 'userTypeId', 'profileImage']);
        if (!user) {
            const user = new User_1.default({
                name: displayName,
                email: email,
                mobile: phoneNumber,
                profileImage: photoURL,
                uid: uid
            });
            const userDoc = yield user.save();
            const token = jsonwebtoken_1.default.sign({ userId: userDoc._id, email: userDoc.email, userTypeId: userDoc.userTypeId }, process.env.JWT_SECRET, { expiresIn: '30d' });
            const userObj = user.toObject();
            Object.assign(userObj, { token: token });
            return res.status(200).json({ success: true, data: userObj, message: 'User Successfully Login!' });
        }
        else {
            if (user.uid == uid) {
                const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, userTypeId: user.userTypeId }, process.env.JWT_SECRET, { expiresIn: '30d' });
                const userObj = user.toObject();
                Object.assign(userObj, { token: token });
                return res.status(200).json({ success: true, data: userObj, message: 'User Successfully Login!' });
            }
            else {
                return res.status(404).json({ success: false, data: [], message: 'Please Login with Email and Password' });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, data: error, message: 'Internal Server Error' });
    }
});
exports.loginInWithGoogle = loginInWithGoogle;
