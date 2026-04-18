import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials:true,
});

export const ENDPOINTS = {
    USER: {
        LOGIN: '/user/login',
        SIGNUP: '/user/signup',
        RESET_PASSWORD: '/user/reset-password',
        TWO_FA_SETUP: '/user/2fa-setup',
        QR_CODE: '/user/qr-code',
    }
}