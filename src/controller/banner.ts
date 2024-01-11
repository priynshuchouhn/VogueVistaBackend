import { NextFunction, Request, Response } from "express"
import Banner from "../models/Banner"


/*
    Banner Type Id

    1 => Home Page main Banner
    2 => Home Page Promotional Banner

*/


export const getHomeBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lstBanner = await Banner.find({ bannerTypeId: 1 })
        res.status(200).json({ success: true, data: lstBanner, message: 'Banner data fetched!' })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to fetch banners!' })
    }
}
export const getHomePromotionalBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lstBanner = await Banner.find({ bannerTypeId: 2 })
        res.status(200).json({ success: true, data: lstBanner, message: 'Banner data fetched!' })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Failed to fetch banners!' })
    }
}


export const addHomeBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bannerImage, bannerHeading, bannerSmallText, bannerSubheading, bannerTypeId } = req.body
        const banner = new Banner({
            bannerImage: bannerImage,
            bannerTypeId: bannerTypeId,
            bannerHeading: bannerHeading,
            bannerSmallText: bannerSmallText,
            bannerSubheading: bannerSubheading
        })
        const newBanner = await banner.save()
        res.status(200).json({ success: true, data: newBanner, message: 'Banner Added successfully!' })
    } catch (error) {
        res.status(404).json({ success: false, data: error, message: 'Banner Add failed!' })
    }

}