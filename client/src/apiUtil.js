import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
});

// Stable session ID for this browser tab — used to identify the sender
// so the server can skip notifying the tab that triggered the mutation.
export const SESSION_ID = crypto.randomUUID();

export const BASE_URL = 'http://localhost:4000';

export const ENDPOINTS = {
    USER: {
        LOGIN: '/user/login',
        SIGNUP: '/user/signup',
        RESET_PASSWORD: '/user/reset-password',
        TWO_FA_SETUP: '/user/2fa-setup',
        QR_CODE: '/user/qr-code',
        LOGOUT: '/user/logout',
    },
    CART: {
        GET: '/cart/',
        ADD: '/cart/add/',
        REMOVE: '/cart/remove/',
        INCREMENT: '/cart/increment/',
        DECREMENT: '/cart/decrement/',
        CLEAR: '/cart/clear',
        EVENTS: '/cart/events',
    },
    STRIPE:{
        CREATE_CHECKOUT_SESSION: '/stripe/create-checkout-session',
    }
}