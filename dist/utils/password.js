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
exports.verifyPassword = exports.createHashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const createHashedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcrypt_1.default.hash(password, saltRounds);
        return hash;
    }
    catch (error) {
        let message = 'Encryption Failed';
        if (error instanceof Error)
            message = error.message;
        throw new Error(message);
    }
});
exports.createHashedPassword = createHashedPassword;
const verifyPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatch = yield bcrypt_1.default.compare(password, hashedPassword);
        if (isMatch) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error('Password comparison error:', error);
        let message = 'Password comparison error';
        if (error instanceof Error)
            message = error.message;
        throw new Error(message);
    }
});
exports.verifyPassword = verifyPassword;
