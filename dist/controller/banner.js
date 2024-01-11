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
exports.addHomeBanner = exports.getHomePromotionalBanner = exports.getHomeBanner = void 0;
const Banner_1 = __importDefault(require("../models/Banner"));
/*
    Banner Type Id

    1 => Home Page main Banner
    2 => Home Page Promotional Banner

*/
const getHomeBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lstBanner = yield Banner_1.default.find({ bannerTypeId: 1 });
        res.status(200).json({ success: true, data: lstBanner, message: 'Banner data fetched!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to fetch banners!' });
    }
});
exports.getHomeBanner = getHomeBanner;
const getHomePromotionalBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lstBanner = yield Banner_1.default.find({ bannerTypeId: 2 });
        res.status(200).json({ success: true, data: lstBanner, message: 'Banner data fetched!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to fetch banners!' });
    }
});
exports.getHomePromotionalBanner = getHomePromotionalBanner;
const addHomeBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bannerImage, bannerHeading, bannerSmallText, bannerSubheading, bannerTypeId } = req.body;
        const banner = new Banner_1.default({
            bannerImage: bannerImage,
            bannerTypeId: bannerTypeId,
            bannerHeading: bannerHeading,
            bannerSmallText: bannerSmallText,
            bannerSubheading: bannerSubheading
        });
        const newBanner = yield banner.save();
        res.status(200).json({ success: true, data: newBanner, message: 'Banner Added successfully!' });
    }
    catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Banner Add failed!' });
    }
});
exports.addHomeBanner = addHomeBanner;
