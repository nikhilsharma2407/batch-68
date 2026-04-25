import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import routes from './routes';
import UserContextProvider from './UserContextProvider';
import { configureStore } from '@reduxjs/toolkit'
import countReducer from './reducers/countReducer';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk';

const logger = createLogger();

const store = configureStore({
  reducer: countReducer,
  middleware: () => [thunk, logger]
})

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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
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
