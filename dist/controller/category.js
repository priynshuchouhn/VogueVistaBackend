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
exports.addCategory = exports.getCategoryList = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const getCategoryList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const lstCategory = await Category.deleteMany({})
        const lstCategory = yield Category_1.default.find();
        res.status(200).json({ success: true, data: lstCategory, message: 'Category data fetched!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: [], message: 'Failed to get category!' });
    }
});
exports.getCategoryList = getCategoryList;
const addCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, image } = req.body;
        const category = new Category_1.default({
            name: name,
            image: image,
            description: description
        });
        const newCategory = yield category.save();
        res.status(200).json({ success: true, data: newCategory, message: 'Category added successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to add category!' });
    }
});
exports.addCategory = addCategory;
