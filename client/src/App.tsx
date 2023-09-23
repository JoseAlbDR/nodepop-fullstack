import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  DashboardLayout,
  ErrorPage,
  AppLayout,
  Landing,
  Login,
  Register,
  AddProduct,
  Stats,
  AllProducts,
  Profile,
  Admin,
} from './pages';
import { action as registerAction } from './pages/Register';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddProduct />,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-products',
            element: <AllProducts />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
