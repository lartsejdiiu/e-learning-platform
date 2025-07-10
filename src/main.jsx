// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// 1. Import your page components
import App from './App.jsx';
import AboutPage from './pages/AboutPage.jsx'; // Example page
import Dashboard from './pages/Dashboard.jsx'; // Example page
import './index.css';

// 2. This is where you create your router
const router = createBrowserRouter(
  [
    // Add your routes here
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ],
  {
    // The future flags object to resolve the warnings
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

// 3. Render the app using the RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);