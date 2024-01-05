import mongoose, { Schema, model } from "mongoose";
const { ObjectId } = mongoose.Types;


const BannerSchema = new mongoose.Schema({
    bannerImage: { type: String, required: true },
    bannerTypeId: { type: Number, required: true },
    bannerSmallText: String,
    bannerHeading: String,
    bannerSubheading: String,
})

const Banner = model('banner', BannerSchema)

export default Banner;