import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected' , ()=> console.log('MongoDB connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/ucart`)
    } catch (error) {
        console.error(error.message);
    }
}

export default connectDB; // export the connectDB function to be used in other files
