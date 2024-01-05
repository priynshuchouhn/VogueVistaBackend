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
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, userTypeId } = req.body;
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
        res.status(200).json({ success: true, data: userObj, message: 'User Successfully Registered!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'User Registration Failed!' });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email: email.toLowerCase() }).select(['_id', 'name', 'email', 'password', 'userTypeId']);
    if (user) {
        const hashedPassword = user.password;
        const isMatch = yield (0, password_1.verifyPassword)(password, hashedPassword);
        console.log(user);
        if (isMatch) {
            const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, userTypeId: user.userTypeId }, process.env.JWT_SECRET, { expiresIn: '30d' });
            const userObj = user.toObject();
            delete userObj.password;
            Object.assign(userObj, { token: token });
            res.status(200).json({ success: true, data: userObj, message: 'User Successfully Login!' });
        }
        else {
            res.status(404).json({ success: false, data: [], message: 'Invalid Login Credentials!' });
        }
    }
    else {
        res.status(404).json({ success: false, data: [], message: 'User not found' });
    }
});
exports.login = login;
