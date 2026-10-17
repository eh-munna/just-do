import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Privacy from '../pages/Privacy';
import UserDetail from '../pages/UserDetail';
import Users from '../pages/Users';
import UsersDiff from '../pages/UsersDiff';
import { getUsers } from '../utils/getUsers';
import { userLoader } from '../utils/userLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'privacy', Component: Privacy },
      { path: 'contact', Component: Contact },
      {
        path: 'users',
        Component: Users,
        loader: userLoader,
      },
      {
        path: 'users/:id',
        Component: UserDetail,
        loader: userLoader,
      },
      {
        path: 'users-diff',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UsersDiff getUsers={getUsers()} />
          </Suspense>
        ),
      },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);
