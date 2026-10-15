import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import About from '../pages/About';
import Home from '../pages/Home';
import Weather from '../pages/Weather';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'weather',
        Component: Weather,
      },
    ],
  },
]);
