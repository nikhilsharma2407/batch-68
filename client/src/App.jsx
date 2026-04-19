import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router';
import MyNavbar from './MyNavbar';
import Toast from './Toast';
import Loader from './Loader';
import { useIsFetching, useIsMutating, useQuery } from '@tanstack/react-query';
import { axiosInstance, ENDPOINTS } from './apiUtil';
import { UserContext } from './UserContextProvider';
import { toast } from 'react-toastify';
import { useCartSSE } from './hooks/useCart';

const App = () => {

  const { setUserData } = useContext(UserContext);

  useCartSSE();

  const { data } = useQuery({
    queryKey: ['userData'],
    queryFn: () => axiosInstance.get(ENDPOINTS.USER.LOGIN),
    staleTime: 3600_000,
    refetchOnWindowFocus: false,
    retry: false,
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
