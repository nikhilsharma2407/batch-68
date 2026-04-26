import express from "express"
import Stripe from "stripe";
import UserModel from "../UserModel.js";
import { responseCreator } from "../utils/utils.js";

const stripeRouter = express.Router();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


stripeRouter.get('/', (res) => res.send('stripe route is working'));

stripeRouter.post('/create-checkout-session', async (req, res, next) => {
    try {
        const username = res.locals.username
        const  data  = await UserModel.getCart(username);
        console.log("🚀 ~ data:", data.cart)
        console.log("🚀 ~ data.cart.items:", data.cart.items)

        const lineItems = data?.cart?.items?.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [item.image],
                },
                unit_amount: Math.round(item.unitPrice * 100), // Stripe expects amounts in cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session-id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel?session-id={CHECKOUT_SESSION_ID}`,
        });
        console.log("🚀 ~ process.env.CLIENT_URL:", process.env.CLIENT_URL)
        console.log("🚀 ~ session:", session)

        res.send(responseCreator('Checkout Session Created', {
            url: session.url,
            id: session.id
        }));
    } catch (error) {
        next(error);
    }
});


export default stripeRouter;