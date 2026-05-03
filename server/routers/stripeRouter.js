import express from "express"
import Stripe from "stripe";
import UserModel from "../UserModel.js";
import { responseCreator } from "../utils/utils.js";
import { notifyAllSessions } from "../utils/sseRegistry.js";

const stripeRouter = express.Router();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


stripeRouter.get('/', (_req, res) => res.send('stripe route is working'));

stripeRouter.get('/session/:sessionId', async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const username = res.locals.username;

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items.data.price.product'],
        });

        // Map Stripe line items to our order item shape
        const items = (session.line_items?.data ?? []).map((item) => ({
            title: item.description,
            image: item.price?.product?.images?.[0] ?? '',
            quantity: item.quantity,
            unitPrice: item.price?.unit_amount / 100,
            totalPrice: item.amount_total / 100,
        }));

        const { order, created } = await UserModel.createOrder(username, {
            sessionId,
            items,
            totalAmount: session.amount_total / 100,
            currency: session.currency,
            status: session.payment_status,
        });

        // Notify all connected sessions that the cart has been cleared (order created)
        if (created) {
            notifyAllSessions(username);
        }

        res.send(responseCreator(
            created ? 'Order created' : 'Order already exists',
            { session, order }
        ));
    } catch (error) {
        next(error);
    }
});

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
            // http://localhost:5173/success?session-id=cs_test_b1aH4vDApXMXtRysHktLYLj17nkSCLSHQgmQXqvAUiKG7U7r3KANQT7x7v
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