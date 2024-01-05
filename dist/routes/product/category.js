"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../../controller/category");
const authenticate_1 = require("../../middleware/authenticate");
const authorize_1 = require("../../middleware/authorize");
const router = express_1.default.Router();
router.get('/list', category_1.getCategoryList);
router.post('/add', authenticate_1.authenticate, authorize_1.authorize, category_1.addCategory);
exports.default = router;
