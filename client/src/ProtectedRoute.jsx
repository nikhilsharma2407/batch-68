import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance, ENDPOINTS } from './apiUtil';
import useIsLoggedIn from './hooks/useIsLoggedIn';

const ProtectedRoute = () => {
    const isLoggedin = useIsLoggedIn();
    const { isLoading, data } = useQuery({
        queryKey: ['userData'],
        queryFn: () => axiosInstance.get(ENDPOINTS.USER.LOGIN),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        retry: false,
    });
    console.log("🚀 ~ ProtectedRoute ~ data:", data)
    console.log("🚀 ~ ProtectedRoute ~ isLoading:", isLoading)

    const { pathname } = useLocation();

    if (isLoading) return null;

    if (!data && !isLoggedin) {
        return <Navigate to="/login" replace state={pathname} />
    }

    return <Outlet />
}

export default ProtectedRoute
