import Stripe from "stripe"; // Correct import
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const stripeInstance = Stripe(process.env.STRIPE_SECRET_KEY); // Correct initialization

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, Promise.resolve(0));

        amount += Math.floor(amount * 0.02); // Add 2% tax

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.error("Error in placeOrderCOD:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        let productData = [];

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, Promise.resolve(0));

        amount += Math.floor(amount * 0.02); // Add 2% tax

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        // Create Stripe session
        const line_items = productData.map(item => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: Math.floor(item.price + item.price * 0.02) * 100, // Tax included
            },
            quantity: item.quantity,
        }));

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            },
        });

        return res.json({ success: true, url: session.url });
    } catch (error) {
        console.error("Error in placeOrderStripe:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Stripe Webhooks to verify payments action : /stripe
export const stripeWebhooks = async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Error in stripeWebhooks:", error);
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const paymentIntentId = paymentIntent.id;

                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId,
                });

                const { orderId, userId } = sessionList.data[0].metadata;

                await Order.findByIdAndUpdate(orderId, { isPaid: true });
                await User.findByIdAndUpdate(userId, { cartItems: {} });

                break;
            }
            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object;
                const paymentIntentId = paymentIntent.id;

                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId,
                });

                const { orderId } = sessionList.data[0].metadata;
                await Order.findByIdAndDelete(orderId);

                break;
            }
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        response.json({ received: true });
    } catch (error) {
        console.error("Error processing webhook event:", error);
        response.status(500).send(`Internal Server Error`);
    }
};

// Get orders by userID  : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.product address")
        .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error in getUserOrders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.product address")
        .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
