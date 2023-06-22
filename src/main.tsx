import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import Root from './Root';
import {
  AddProduct,
  Cart,
  Checkout,
  Dashboard,
  EditProduct,
  ErrorPage,
  Home,
  Login,
  Register,
  Reviews,
  ViewProduct,
} from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <Home />,
          },
          { path: 'new', element: <AddProduct /> },
          {
            path: ':productId',
            element: <ViewProduct />,
            children: [
              { index: true, element: <Reviews /> },
              { path: 'edit', element: <EditProduct /> },
            ],
          },
        ],
      },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
