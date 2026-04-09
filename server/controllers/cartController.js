import UserModel from "../UserModel.js"
import { responseCreator } from "../utils.js";

export const getCart = async (req, res, next) => {
    try {
        const { username } = req.body
        const data = await UserModel.getCart(username);
        res.send(data);
    } catch (error) {
        next(error)
    }
}

export const addToCart = async (req, res, next) => {
    try {
        const { username, product } = req.body
        const cartData = await UserModel.addToCart(username, product)
        console.log("🚀 ~ addToCart ~ cartData:", cartData)
        res.send(responseCreator(`${product.title} added to cart`, cartData))

    } catch (error) {
        next(error)
    }
}