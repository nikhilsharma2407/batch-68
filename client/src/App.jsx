import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router';
import MyNavbar from './MyNavbar';
import Toast from './Toast';
import Loader from './Loader';
import { useIsFetching, useIsMutating, useQuery } from '@tanstack/react-query';
import { axiosInstance, ENDPOINTS } from './apiUtil';
import { UserContext } from './UserContextProvider';
import { toast } from 'react-toastify';
import { useCartSSE } from './hooks/useCart';

const App = () => {

  const { userData, setUserData } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authToken = searchParams.get('authToken');

  useCartSSE();

  // Magic link authentication query
  const { data: magicLinkData, isError: isMagicLinkError, error: magicLinkError } = useQuery({
    queryKey: ['magicLinkAuth', authToken],
    queryFn: () => axiosInstance.get(`${ENDPOINTS.USER.LOGIN_WITH_MAGIC_LINK}?authToken=${authToken}`),
    enabled: !!authToken,
    retry: false,
    staleTime: 0,
  });

  // Handle magic link authentication result
  useEffect(() => {
    if (magicLinkData) {
      setUserData(magicLinkData.data);
      toast.success(magicLinkData.data.message);
      // Remove the token from URL
      searchParams.delete('authToken');
      setSearchParams(searchParams);
      // Navigate to home
      navigate('/');
    }
  }, [magicLinkData, setUserData, navigate, searchParams, setSearchParams]);

  useEffect(() => {
    if (isMagicLinkError) {
      toast.error(magicLinkError?.response?.data?.message || 'Magic link authentication failed');
      // Remove the token from URL
      searchParams.delete('authToken');
      setSearchParams(searchParams);
      // Navigate to login
      navigate('/login');
    }
  }, [isMagicLinkError, magicLinkError, navigate, searchParams, setSearchParams]);

  const { data } = useQuery({
    queryKey: ['userData'],
    queryFn: () => axiosInstance.get(ENDPOINTS.USER.LOGIN),
    staleTime: 3600_000,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !(authToken || userData), // Don't fetch user data if magic link auth is in progress
  });

  useEffect(() => {
    if (data) {
      setUserData(data.data);
      toast.success(data.data.message);
    }
  }, [data]);

  // const name = 'Nikhil';
  // const [showComponent, setShowComponent] = useState(true);

  const isFetching = useIsFetching({ predicate: (query) => !query.queryKey.includes('cart') });
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  return (
    <>
      {isLoading && <Loader />}

      {/* <section className='mt-5'>
        <h1>App component</h1>
        <Link to='products'>Products</Link>
        <br />
        <Link to='flex' replace>Flex</Link>
        <a href='flex'>Flex</a>
        <br />
        <Link to='routing/apple-iphone-16-black-128-gb?query=iPhone&location=IN'>Routing</Link>
        <br />
      </section> */}

      {/* <Products /> */}
      {/* Outlet is a placeholder, will be replaced by matching route component */}
      <MyNavbar />
      <Outlet />
      <Toast />
    </>
  )
}

export default App

// cart->not logged in -> navigate to login page
