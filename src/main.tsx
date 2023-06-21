import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import Root from './Root';
import {
  Cart,
  Dashboard,
  ErrorPage,
  Home,
  Login,
  Register,
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
          { path: ':productId', element: <ViewProduct /> },
        ],
      },
      { path: 'cart', element: <Cart /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
