import express from "express";
import { addToCart, clearCart, getCart } from "../controllers/cartController.js";
import authController from "../controllers/authController.js";
const cartRouter = express.Router();


cartRouter.get('/', authController, getCart);
cartRouter.post('/add', authController, addToCart);
cartRouter.put('/clear', authController, clearCart);

export default cartRouter