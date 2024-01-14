"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_1 = require("../../controller/address");
const authenticate_1 = require("../../middleware/authenticate");
const router = express_1.default.Router();
router.get('/getAddress', authenticate_1.authenticate, address_1.getAllAddresses);
router.post('/add', authenticate_1.authenticate, address_1.addAddress);
exports.default = router;
