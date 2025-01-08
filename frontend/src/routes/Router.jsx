import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Login from '../pages/user/Login';
import Home from '../pages/Home';
import Register from '../pages/user/Register';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,  // MainLayout handles the root path
    children: [
      {
        path: '/',  // Renders Login at "/"
        element: <Home />,
      },
      {
        path: '/login',  // Renders Login at "/"
        element: <Login />,
      },
      {
        path: '/register',  // Renders Login at "/"
        element: <Register />,
      },
    ],
  },
]);

export default Router;
