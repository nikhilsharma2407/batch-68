import Cancel from "./Cancel";
import Cart from "./Cart";
import Counter from "./Counter";
import Flexbox from "./Flexbox";
import Login from "./Login";
import Orders from "./Orders";
import Products from "./Products";
import ProtectedRoute from "./ProtectedRoute";
import Routing from "./Routing";
import Signup from "./Signup";
import Success from "./Success";
import TwoFAsetup from "./TwoFAsetup";

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