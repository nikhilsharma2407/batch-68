import React, { useState } from 'react'
import Component1 from "./Component1";
import Flexbox from './Flexbox';
import Products from './Products';
import { Link, Outlet } from 'react-router';
import MyNavbar from './MyNavbar';

const App = () => {

  const name = 'Nikhil';
  const [showComponent, setShowComponent] = useState(true);

  return (
    <>
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
    </>

  )
}

export default App


// cart->not logged in -> navigate to login page