import UserModel from "../UserModel.js";
import { errorCreator, responseCreator, sanitizeUserData } from "../utils.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    const userData = await UserModel.findUser(username);

    if (userData.password !== password) {
        errorCreator('Incorrect Password', 401)
    } else {
        res.status(200);
        res.send(responseCreator(`${username} logged in successfully`, sanitizeUserData(userData)))
    }
};

export const signup = async (req, res) => {
    const userdata = req.body;
    const data = await UserModel.createUserAcc(userdata);
    if (data) {
        res.send({ message: `${data.username} signed up successfully!!!` });
    }
};