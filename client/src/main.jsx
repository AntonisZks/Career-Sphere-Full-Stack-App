import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage.jsx';
import NetworkPage from './pages/NetworkPage/NetworkPage.jsx';

import './styles/variables.css';
import './main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/home',
    element: <HomePage/>
  },
  {
    path: '/network',
    element: <NetworkPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
