import { lazy } from "react";
import Products from "./Products";
const Cart = lazy(() => import("./Cart"));
const Cancel = lazy(() => import("./Cancel"));
const Counter = lazy(() => import("./Counter"));
const Flexbox = lazy(() => import("./Flexbox"));
const Login = lazy(() => import("./Login"));
const Orders = lazy(() => import("./Orders"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const Routing = lazy(() => import("./Routing"));
const Signup = lazy(() => import("./Signup"));
const Success = lazy(() => import("./Success"));
const TwoFAsetup = lazy(() => import("./TwoFAsetup"));
// import Cancel from "./Cancel";
// import Counter from "./Counter";
// import Flexbox from "./Flexbox";
// import Login from "./Login";
// import Orders from "./Orders";
// import ProtectedRoute from "./ProtectedRoute";
// import Routing from "./Routing";
// import Signup from "./Signup";
// import Success from "./Success";
// import TwoFAsetup from "./TwoFAsetup";

const routes = [
    {
        path: '/',
        element: <Products />
    },
    {
        path: 'flex',
        element: <Flexbox />
    },
    {
        path: 'routing/:productId',
        element: <Routing />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'signup',
        element: <Signup />
    },
    {
        path: 'counter',
        element: <Counter />
    },

    {
        path: 'user',
        element: <ProtectedRoute />,
        children: [
            { path: '2fa-setup', element: <TwoFAsetup /> },
            { path: 'cart', element: <Cart /> },
            { path: 'orders', element: <Orders /> },
        ]
    },
    {
        path: 'success',
        element: <Success />
    },
    {
        path: 'cancel',
        element: <Cancel />
    },
];

export default routes