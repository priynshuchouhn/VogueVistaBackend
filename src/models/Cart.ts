import mongoose, { model } from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    productId: { type: mongoose.Types.ObjectId, required: true },
    product: { type: mongoose.Types.ObjectId, ref: 'product' },
    quantity: { type: Number, required: true },
    sizeVariant: { type: String },
});

const Cart = model('cart', cartSchema);
export default Cart;