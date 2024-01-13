import mongoose, { model } from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required: true, ref:'user'},
    name: {type: String, required: true},
    phone: {type: Number, required: true},
    addressLine1: {type: String, required:true},
    addressLine2: {type: String},
    city: {type: String, required:true},
    state: {type: String, required:true},
    pincode: {type: String, required:true},
    isDefault: {type: Boolean, required:true},
})

const Address = model('address', addressSchema);
export default Address;