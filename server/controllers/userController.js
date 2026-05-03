import UserModel from "../UserModel.js";
import { errorCreator, responseCreator, sanitizeUserData } from "../utils/utils.js";
import { genPasswordHash, verifyPassword } from "../utils/passwordUtil.js";
import { generateToken, verifyToken } from "../utils/jwtUtil.js";
import { generateQRcode, verifyOTP } from "../utils/totpUtil.js";
import transporter from "../utils/mailUtil.js";

export const login = async (req, res, next) => {
    try {

        const { username, password } = req.body;
        const userData = await UserModel.findUser(username);

        const isPasswordCorrect = await verifyPassword({ password, passwordHash: userData.password })

        if (isPasswordCorrect) {
            res.status(200);
            const token = generateToken(userData);
            const data = sanitizeUserData(userData);
            console.log(data);
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
            const isUpdated = await UserModel.updateUserAcc(username, { secret });
            if (isUpdated) {
                res.clearCookie('secret');
                res.send(responseCreator('2FA Setup complete'));
            }
        } else {
            errorCreator('Incorrect OTP, please try again', 401);
        }
    } catch (error) {
        next(error)
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { username, newPassword, otp } = req.body;

        const userData = await UserModel.findUser(username);

        const { secret } = userData;

        const isVerified = verifyOTP(secret, otp);
        if (isVerified) {
            const pwdHash = await genPasswordHash(newPassword);
            const isUpdated = await UserModel.updateUserAcc(username, { password: pwdHash });
            // check if newPassword is same as old password
            if (isUpdated) {
                res.send(responseCreator(`Password reset successfully for ${username}`));
            }
        } else {
            errorCreator('Incorrect OTP, please try again', 401);
        }
    } catch (error) {
        next(error)
    }
};

export const logout = async (req, res, next) => {
    res.clearCookie('authToken');
    res.send(responseCreator("Logged out"))
}

export const generateMagicLink = async (req, res, next) => {
    try {
        const { username } = req.body;
        const userData = await UserModel.findUser(username);
        const token = generateToken(userData, '10m');

        const url = `${process.env.CLIENT_URL}?authToken=${token}`;

        const subject = 'Your Magic Link for Login';
        const text = `Hello ${username},\n\nClick the link below to login to your account:\n\n${url}\n\nThis link will expire in 10 minutes.\n\nIf you didn't request this link, please ignore this email.`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Hello ${username},</h2>
                <p>Click the button below to login to your account:</p>
                <div style="margin: 30px 0;">
                    <a href="${url}" 
                       style="background-color: #007bff; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 4px; display: inline-block;">
                        Login to Your Account
                    </a>
                </div>
                <p>Or copy and paste this link in your browser:</p>
                <p style="word-break: break-all; color: #666;">${url}</p>
                <p style="color: #999; font-size: 14px; margin-top: 30px;">
                    This link will expire in 10 minutes.
                </p>
                <p style="color: #999; font-size: 14px;">
                    If you didn't request this link, please ignore this email.
                </p>
            </div>
        `;

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: userData.email,
            subject,
            text,
            html,
        });

        console.log("Magic link email sent:", info.messageId);
        
        res.send(responseCreator('Magic link sent to your email', { emailSent: true }));

    } catch (error) {
        next(error);
    }
};

export const loginViaMagicLink = async (req, res, next) => {
    try {
        let { authToken } = req.query;
        console.log("🚀 ~ loginViaMagicLink ~ authToken:", authToken);
        const { username } = verifyToken(authToken);
        if (!username) {
            const error = new Error('This login link is no longer valid. Please request a new one');
            error.status = 401;
            throw error;
        }
        // res.local is a placeholder to store data which can be shared among middlewares
        res.locals.username = username;
        const userData = await UserModel.findUser(username);

        if (userData) {
            res.status(200);
            const data = sanitizeUserData(userData);
            const token = generateToken(userData);
            res.cookie('authToken', token, {
                maxAge: 3600_000,
                // client cannot read httpOnly cookies
                httpOnly: true
            })
            res.send(responseCreator(`${username} logged in with magic link successfully`, data))
        }
    } catch (error) {
        next(error)
    }
}
