import mongoose, { Types, model } from "mongoose";

const orderSchema = new mongoose.Schema({
userId : {type: Types.ObjectId, required: true , ref:'user'},
orderNumber : {type: String, required: true},
orderDate : {type: Date, required: true},
shippingAddress : {type: Types.ObjectId, required: true, ref:'address'},
totalAmount : {type: Number, required: true},
orderStatus : {type: String, enum: ['Placed', 'In Process', 'Dispatched', 'In Transit', 'Delivered'], default: 'Placed',},
paymentId : {type: String, required: true},
paymentMethod : {type: String, required: true},
products : {type: [Types.ObjectId], required: true, ref:'product'},
discount :{type: Number},
shippingCharges :{type: Number}
});

const Order = model('order', orderSchema);
export default Order;