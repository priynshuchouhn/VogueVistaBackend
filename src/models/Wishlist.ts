import mongoose, { Types, model } from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: {type: Types.ObjectId , required: true, ref:'user'},
    productId: {type: Types.ObjectId , required: true, ref:'product'},
})

const Wishlist = model('wishlist',wishlistSchema);
export default Wishlist;