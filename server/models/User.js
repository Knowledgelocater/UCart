import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartItems: {type: Object, default: {} },
},{minimize: false}) 

const User = mongoose.models.user || mongoose.model('user' , userSchema)  //"If a model named 'user' already exists, reuse it. Otherwise, create it."

export default User; // export the User model to be used in other files