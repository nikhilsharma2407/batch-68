import Cart from "./Cart";
import Flexbox from "./Flexbox";
import Login from "./Login";
import Orders from "./Orders";
import Products from "./Products";
import ProtectedRoute from "./ProtectedRoute";
import Routing from "./Routing";

const routes = [
    {
        path: 'products',
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
        path: 'user',
        element: <ProtectedRoute />,
        children: [
            { path: 'cart', element: <Cart /> },
            { path: 'orders', element: <Orders /> },
        ]
    },
];

export default routes