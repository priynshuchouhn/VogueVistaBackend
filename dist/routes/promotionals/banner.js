"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const banner_1 = require("../../controller/banner");
const authorize_1 = require("../../middleware/authorize");
const authenticate_1 = require("../../middleware/authenticate");
const router = express_1.default.Router();
router.get('/homePageBanner', banner_1.getHomeBanner);
router.get('/getHomePromotionalBanner', banner_1.getHomePromotionalBanner);
router.post('/addHomeBanner', authenticate_1.authenticate, authorize_1.authorize, banner_1.addHomeBanner);
exports.default = router;
