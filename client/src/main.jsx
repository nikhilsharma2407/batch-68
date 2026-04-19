import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import routes from './routes';
import UserContextProvider from './UserContextProvider';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes,
  }
])

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
    
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
  </QueryClientProvider>,
)
