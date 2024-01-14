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
exports.addAddress = exports.getAllAddresses = void 0;
const Address_1 = __importDefault(require("../models/Address"));
const getAllAddresses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const lstAddress = yield Address_1.default.find({ userId: userId });
        res.status(200).json({ success: true, data: lstAddress, message: 'Address fetched successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: [], message: 'Failed to fetch address!' });
    }
});
exports.getAllAddresses = getAllAddresses;
const addAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const { name, phone, addressType, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;
        if (isDefault) {
            const updatedAddress = yield Address_1.default.updateMany({ userId: userId }, { $set: { isDefault: false } });
        }
        const address = new Address_1.default({
            userId: userId,
            addressType: addressType,
            name: name,
            phone: phone,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            pincode: pincode,
            isDefault: isDefault,
        });
        const newAddress = yield address.save();
        res.status(200).json({ success: true, data: newAddress, message: 'Address added succesfully!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to add address!' });
    }
});
exports.addAddress = addAddress;
