import express from "express";
import { addToCart, getCart } from "../controllers/cartController.js";
const cartRouter = express.Router();


cartRouter.get('/', getCart);
cartRouter.post('/add', addToCart);

export default cartRouter