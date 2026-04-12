import UserModel from "../UserModel.js";
import { errorCreator, responseCreator, sanitizeUserData } from "../utils/utils.js";
import { genPasswordHash, verifyPassword } from "../utils/passwordUtil.js";
import { generateToken } from "../utils/jwtUtil.js";
import { generateQRcode, verifyOTP } from "../utils/totpUtil.js";

export const login = async (req, res, next) => {
    try {

        const { username, password } = req.body;
        const userData = await UserModel.findUser(username);

        const isPasswordCorrect = await verifyPassword({ password, passwordHash: userData.password })

        if (isPasswordCorrect) {
            res.status(200);
            const token = generateToken(userData);
            const data = sanitizeUserData(userData);
            res.cookie('authToken', token, {
                maxAge: 3600_000,
                // client cannot read httpOnly cookies
                httpOnly: true
            })
            res.send(responseCreator(`${username} logged in successfully`, data))
        } else {
            errorCreator('Incorrect Password', 401)
        }
    } catch (error) {
        next(error)
    }
};

export const loginWithCookie = async (req, res) => {
    try {
        const { username } = res.locals;
        const userData = await UserModel.findUser(username);

        if (userData) {
            res.status(200);
            const data = sanitizeUserData(userData);
            res.send(responseCreator(`${username} logged in with cookie successfully`, data))
        }
    } catch (error) {
        next(error)
    }
};

export const signup = async (req, res, next) => {
    try {
        const userdata = req.body;
        const passwordHash = await genPasswordHash(userdata.password);
        const { username } = userdata
        // replace the plain-text password with saltedHash
        userdata.password = passwordHash;
        const data = await UserModel.createUserAcc(userdata);
        if (data) {
            res.send(responseCreator(`${username} signed up successfully!!!`));
        }
    } catch (error) {
        next(error)
    }
};

export const getQRcode = async (req, res, next) => {
    try {
        const { username } = res.locals;
        const { qrCode, secret } = await generateQRcode(username);
        res.cookie('secret', secret, { httpOnly: true, maxAge: 3600_000 });
        res.send(responseCreator('2FA QR code generated', qrCode));

    } catch (error) {
        next(error)
    }
}

export const twoFAsetup = async (req, res, next) => {
    try {
        const { otp } = req.body;
        const { username } = res.locals;
        const { secret } = req.cookies;
        const isVerified = verifyOTP(secret, otp);
        if (isVerified) {
            const isUpdated = await UserModel.updateUserAcc(username, {secret});
            if (isUpdated) {
                res.send(responseCreator('2FA Setup complete'));
            }
        } else {
            errorCreator('Incorrect OTP, please try again');
        }
    } catch (error) {
        next(error)
    }
};
