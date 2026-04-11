import UserModel from "../UserModel.js";
import { errorCreator, responseCreator, sanitizeUserData } from "../utils/utils.js";
import { genPasswordHash, verifyPassword } from "../utils/passwordUtil.js";
import { generateToken } from "../utils/jwtUtil.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    const userData = await UserModel.findUser(username);

    const isPasswordCorrect = await verifyPassword({ password, passwordHash: userData.password })

    if (isPasswordCorrect) {
        res.status(200);
        const token = generateToken(userData, '1m');
        const data = sanitizeUserData(userData);
        data.token = token
        res.send(responseCreator(`${username} logged in successfully`, data))
    } else {
        errorCreator('Incorrect Password', 401)
    }
};

export const signup = async (req, res) => {
    const userdata = req.body;
    const passwordHash = await genPasswordHash(userdata.password);

    // replace the plain-text password with saltedHash
    userdata.password = passwordHash
    const data = await UserModel.createUserAcc(userdata);
    if (data) {
        res.send({ message: `${data.username} signed up successfully!!!` });
    }
};