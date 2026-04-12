import { toDataURL } from "qrcode";
import speakeasy from "speakeasy"

const encoding = 'base32'

export const generateQRcode = async (username) => {
    const { base32: secret } = speakeasy.generateSecret();

    const otpauth_url = speakeasy.otpauthURL({ secret, label: username, issuer: 'Amazecart', encoding });
    const qrCode = await toDataURL(otpauth_url);
    return { secret, qrCode };
};


export const verifyOTP = (secret, otp) => {
    const isVerified = speakeasy.totp.verify({
        secret,
        encoding,
        token: otp
    });

    return isVerified
};
