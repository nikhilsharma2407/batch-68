import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router';
import routes from './routes';
import { Outlet } from 'react-bootstrap-icons';
import Flexbox from './Flexbox';
import Products from './Products';
import Routing from './Routing';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes,
  }
])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />


    {/* declarative routing */}
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='products' element={<Products />} />
          <Route path='flex' element={<Flexbox />} />
          <Route path='routing' element={<Routing />} />
        </Route >
      </Routes>
    </BrowserRouter> */}
  </>,
)
