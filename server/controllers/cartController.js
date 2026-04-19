import { randomUUID } from "crypto";
import UserModel from "../UserModel.js"
import { registerClient, removeClient, notifyOtherSessions } from "../utils/sseRegistry.js";
import { responseCreator } from "../utils/utils.js";

export const cartEvents = (req, res) => {
    const { username } = res.locals;
    const sessionId = req.query.sessionId || randomUUID();

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // keep-alive ping every 30s to prevent proxy timeouts
    const heartbeat = setInterval(() => res.write(': ping\n\n'), 30000);

    const client = registerClient(username, sessionId, res);

    req.on('close', () => {
        clearInterval(heartbeat);
        removeClient(username, client);
    });
};

export const getCart = async (req, res, next) => {
    try {
        const { username } = res.locals
        const data = await UserModel.getCart(username);
        res.send(data);
    } catch (error) {
        next(error)
    }
}

export const addToCart = async (req, res, next) => {
    try {
        const { username } = res.locals;
        const { product, sessionId } = req.body
        const cartData = await UserModel.addToCart(username, product)
        const message = cartData ? `${product.title} added to cart` : `${product.title} already exists in cart`;
        notifyOtherSessions(username, sessionId);
        res.send(responseCreator(message, cartData))
    } catch (error) {
        next(error)
    }
}

export const increment = async (req, res, next) => {
    try {
        const { username } = res.locals;
        const { product, sessionId } = req.body
        const cartData = await UserModel.increment(username, product)
        const message = `${product.title} added to cart`;
        notifyOtherSessions(username, sessionId);
        res.send(responseCreator(message, cartData))
    } catch (error) {
        next(error)
    }
}

export const decrement = async (req, res, next) => {
    try {
        const { username } = res.locals;
        const { product, sessionId } = req.body
        const cartData = await UserModel.decrement(username, product)
        const message = `${product.title} removed from cart`;
        notifyOtherSessions(username, sessionId);
        res.send(responseCreator(message, cartData))
    } catch (error) {
        next(error)
    }
}

export const removeFromCart = async (req, res, next) => {
    try {
        const { username } = res.locals;
        const { id, title, sessionId } = req.body;
        const cartData = await UserModel.removeFromCart(username, id)
        const message = `${title} removed from cart`;
        notifyOtherSessions(username, sessionId);
        res.send(responseCreator(message, cartData))
    } catch (error) {
        next(error)
    }
}

export const clearCart = async (req, res, next) => {
    try {
        const { username } = res.locals;
        const { sessionId } = req.body;
        const cartData = await UserModel.clearCart(username)
        notifyOtherSessions(username, sessionId);
        res.send(responseCreator(`cart cleared for ${username}`, cartData))
    } catch (error) {
        next(error)
    }
}
