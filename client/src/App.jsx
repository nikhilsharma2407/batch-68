import React, { useState } from 'react'
import Component1 from "./Component1";
import Flexbox from './Flexbox';
import Products from './Products';

const App = () => {

  const name = 'Nikhil';
  const [showComponent, setShowComponent] = useState(true);

  return (
    <>
      <Products />
    </>

  )
}

export default App
