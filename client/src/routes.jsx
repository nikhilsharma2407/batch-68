import Cart from "./Cart";
import Counter from "./Counter";
import Flexbox from "./Flexbox";
import Login from "./Login";
import Orders from "./Orders";
import Products from "./Products";
import ProtectedRoute from "./ProtectedRoute";
import Routing from "./Routing";
import Signup from "./Signup";

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
            { path: 'cart', element: <Cart /> },
            { path: 'orders', element: <Orders /> },
        ]
    },
];

export default routes