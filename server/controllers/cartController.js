import UserModel from "../UserModel.js"
import { responseCreator } from "../utils/utils.js";

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
        const { product } = req.body
        const cartData = await UserModel.addToCart(username, product)
        const message = cartData ? `${product.title} added to cart` : `${product.title} already exists in cart`;
        res.send(responseCreator(message, cartData))

    } catch (error) {
        next(error)
    }
}

export const increment = async (req, res, next) => {
    try {
        const { username } = res.locals;
        const { product } = req.body
        const cartData = await UserModel.increment(username, product)
        const message = `${product.title} added to cart`;
        res.send(responseCreator(message, cartData))

    } catch (error) {
        next(error)
    }
}

export const decrement = async (req, res, next) => {
    try {
        const { username } = res.locals;
        const { product } = req.body
        const cartData = await UserModel.decrement(username, product)
        const message = `${product.title} removed from cart`;
        res.send(responseCreator(message, cartData))
    } catch (error) {
        next(error)
    }
}

export const removeFromCart = async (req, res, next) => {
    try {
        const { username } = res.locals;
        const { id, title } = req.body;
        const cartData = await UserModel.removeFromCart(username, id)
        const message = `${title} removed from cart`;
        res.send(responseCreator(message, cartData))

    } catch (error) {
        next(error)
    }
}

export const clearCart = async (req, res, next) => {
    try {
        const { username } = res.locals
        const cartData = await UserModel.clearCart(username)
        res.send(responseCreator(`cart cleared for ${username}`, cartData))
    } catch (error) {
        next(error)
    }
}

