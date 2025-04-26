import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'; // import cors for cross-origin resource sharing
import connectDB from './configs/db.js'; // import the connectDB function from the db.js file
import 'dotenv/config'; // import dotenv to load environment variables
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();  // express app created
const port = process.env.PORT || 4000; // if port is available in the env then it will run on that port else it will run on 4000

await connectDB(); // call the connectDB function to connect to the database
await connectCloudinary();

const allowedOrigin = ['http://localhost:5173']; // allowed origins for CORS

app.post('/stripe',express.raw({type: 'application/json'}), stripeWebhooks)

// middleware configuration
app.use(express.json()); // middleware to parse json data
app.use(cookieParser()); // middleware to parse cookies
app.use(cors({origin:allowedOrigin , credentials:true})); // middleware to allow cross-origin requests

app.get('/' , (req,res)=> res.send("API is Working"));
app.use('/api/user' , userRouter); // use the userRouter for all routes starting with /api/user
app.use('/api/seller' , sellerRouter);
app.use('/api/product' , productRouter);
app.use('/api/cart' , cartRouter);
app.use('/api/address' , addressRouter);
app.use('/api/order' , orderRouter);

export default app;

app.listen(port , () =>{
    console.log(`Server is running on http://localhost:${port}`); // log the port on which the server is running
})