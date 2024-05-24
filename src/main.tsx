import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider.tsx';
import UploadImage from './components/uploadimage.tsx';
import './index.css';
import { BaseLayout } from './layouts';
import EditImage from './components/editimage.tsx';
import Mockup from './components/mockup.tsx';
import SocialMedia from './components/socialmedia.tsx';
import Model from './components/3dmodel.tsx';
// import Assets from './components/assets.tsx';
import Prompt from './components/prompt.tsx';
import Login from './components/loginpage.tsx';
import Dashboard from './components/dashboard.tsx';
import LandingPage from './components/landingPage.tsx';
import Text from './components/text.tsx';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import Mockup2 from './components/mockup2.tsx';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute.tsx'; 
import ProfilePage from './components/profilePage.tsx';

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/genvision',
    element: <LandingPage />
  },
  {
    path: '/genvision/login',
    element: <Login isOauth={true} />,
  },
  {
    path: '/genvision/:userId',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/genvision/:userId/upload',
    element: (
      <PrivateRoute>
        <UploadImage />
      </PrivateRoute>
    ),
  },
  {
    path: '/genvision/:userId/:productId',
    element: (
      <PrivateRoute>
        <BaseLayout />
      </PrivateRoute>
    ),
    errorElement: <h1>error insight</h1>,
    children: [
      {
        index: true
      },
      {
        path: '/genvision/:userId/:productId/profile',
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/genvision/:userId/:productId/upload',
        element: (
          <PrivateRoute>
            <UploadImage />
          </PrivateRoute>
        ),
      },
      {
        path: '/genvision/:userId/:productId/edit',
        element: (
          <PrivateRoute>
            <EditImage />
          </PrivateRoute>
        ),
      },
      {
        path: '/genvision/:userId/:productId/mockup/1',
        element: (
          <PrivateRoute>
            <Mockup />
          </PrivateRoute>
        ),
      },
      {
        path: '/genvision/:userId/:productId/mockup/2',
        element: (
          <PrivateRoute>
            <Mockup2 />
          </PrivateRoute>
        ),
      },
      {
        path: '/genvision/:userId/:productId/text',
        element: (
          <PrivateRoute>
            <Text />
          </PrivateRoute>
        ),
      },
      {
        path: '/genvision/:userId/:productId/social-media',
        element: (
          <PrivateRoute>
            <SocialMedia />
          </PrivateRoute>
        ),
      },
      {
        path: '/genvision/:userId/:productId/3d-model',
        element: (
          <PrivateRoute>
            <Model />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
    <I18nextProvider i18n={i18next}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
