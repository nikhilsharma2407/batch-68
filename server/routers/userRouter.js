import express from "express";
import { getQRcode, login, loginWithCookie, logout, resetPassword, signup, twoFAsetup } from "../controllers/userController.js";
import authController from "../controllers/authController.js";
const userRouter = express.Router();

userRouter.get('/login', authController, loginWithCookie);
userRouter.post('/login', login);
userRouter.post('/signup', signup);
userRouter.patch('/reset-password', resetPassword);

userRouter.get('/qr-code', authController, getQRcode);
userRouter.post('/2fa-setup', authController, twoFAsetup);

userRouter.get('/logout', logout);

export default userRouter;