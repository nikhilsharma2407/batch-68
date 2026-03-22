import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectedRoute = () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const [navigateToLogin, setNavigateToLogin] = useState(null);

    const { pathname } = useLocation();

    useEffect(() => {
        setTimeout(() => {
            if (!isLoggedIn) {
                setNavigateToLogin(true);
            } else {
                setNavigateToLogin(false)
            }
        }, 2000);
    }, [isLoggedIn])


    if (navigateToLogin === true) {
        return <Navigate to="/login" replace state={pathname} />
    } else if (navigateToLogin === false) {
        return <Outlet />
    }
    return <h1>Checking login status</h1>
}

export default ProtectedRoute