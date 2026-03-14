import React, { useState } from 'react'
import Component1 from "./Component1";

const App = () => {

  const name = 'Nikhil';
  const [showComponent, setShowComponent] = useState(true);

  return (
    <>
      <button onClick={() => setShowComponent(!showComponent)}>{showComponent ? 'Hide' : 'Show'} Component</button>
      {showComponent ? <Component1 name={name} /> : null}
    </>

  )
}

export default App
