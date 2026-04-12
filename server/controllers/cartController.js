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
        console.log("🚀 ~ addToCart ~ cartData:", cartData)
        const message = cartData ? `${product.title} added to cart` : `${product.title} already exists in cart`;
        res.send(responseCreator(message, cartData))

    } catch (error) {
        next(error)
    }
}

export const clearCart = async (req, res, next) => {
    try {
        const { username } = res.locals
        const cartData = await UserModel.clearCart(username)
        console.log("🚀 ~ clearCart ~ cartData:", cartData)
        res.send(responseCreator(`cart cleared for ${username}`, cartData))
    } catch (error) {
        next(error)
    }
}