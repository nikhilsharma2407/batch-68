import jwt from "jsonwebtoken";
import { errorCreator } from "./utils.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const generateToken = (userData, time = '1h') => {
    const { username } = userData;
    const payload = { username }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: time });
    return token;
};

export const verifyToken = (token) => {
    if (!token) {
        errorCreator('Token missing, please login to continue!!!', 401);
    }
    return jwt.verify(token, SECRET_KEY)
};