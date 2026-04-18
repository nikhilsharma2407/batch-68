import express from "express";
import { addToCart, clearCart, decrement, getCart, increment, removeFromCart } from "../controllers/cartController.js";
import authController from "../controllers/authController.js";
const cartRouter = express.Router();


cartRouter.get('/', authController, getCart);
cartRouter.post('/add', authController, addToCart);
cartRouter.patch('/increment', authController, increment);
cartRouter.patch('/decrement', authController, decrement);
cartRouter.delete('/remove', authController, removeFromCart);
cartRouter.delete('/clear', authController, clearCart);

export default cartRouter