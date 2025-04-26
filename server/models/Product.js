import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true},
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
}, {timestamps:true})

const Product = mongoose.models.product || mongoose.model('product', productSchema)  //"If a model named 'product' already exists, reuse it. Otherwise, create it."

export default Product; // export the Product model to be used in other files