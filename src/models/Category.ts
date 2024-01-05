import mongoose, { model } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique:true},
    description : String,
    image: String,
})

const Category = model('category', categorySchema);

export default Category;