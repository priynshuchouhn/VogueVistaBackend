import mongoose, { model } from "mongoose";


const productScehma = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'category' },
    sellerName: { type: String, required: true },
    images: { type: [String], required: true },
    shippingPolicy: { type: String },
    otherDetail: { type: String },
    returnRefundPolicy: { type: String },
    disclaimer: { type: String },
    size:[
        {
          sizeName: {
            type: String,
            required: true,
          },
          price : Number,
          _id: false
        },
      ],
}, {timestamps: true})

const Product = model('product', productScehma);

export default Product;