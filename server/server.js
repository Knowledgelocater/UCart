import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
await connectDB();
await connectCloudinary();

// Allowed origins
const allowedOrigin = [
    'http://localhost:5173',
    'https://u-cart-bice.vercel.app',
    'https://u-cart-git-main-kinshuks-projects-433952cd.vercel.app',
    'https://u-cart-kinshuks-projects-433952cd.vercel.app',
    'https://u-cart-front-end.vercel.app'  // Add this if needed
];

// 1️⃣ CORS middleware first
app.use(cors({ origin: allowedOrigin, credentials: true }));

// 2️⃣ Stripe webhook (must use raw body)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// 3️⃣ Normal middlewares
app.use(express.json());
app.use(cookieParser());

// 4️⃣ Routes
app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// 5️⃣ Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
