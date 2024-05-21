import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  // useNavigate,
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
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/genvision/login',
    element: <Login isOauth={true} />,
  },
  {
    path: '/genvision/:userId',
    element: <Dashboard />
  },
  {
    path: '/genvision/:userId/upload',
    element: <UploadImage />
  },
  {
    path: '/genvision/:userId/:productId',
    element: <BaseLayout />,
    errorElement: <h1>error insight</h1>,
    children: [
      {
        index: true
      },
      { path: '/genvision/:userId/:productId/upload', element: <UploadImage /> },
      { path: '/genvision/:userId/:productId/edit', element: <EditImage /> },
      {
        path: '/genvision/:userId/:productId/mockup/assets',
        element: <Mockup />,
        children: [{ path: 'prompt', element: <Prompt /> }],
      },
      { path: '/genvision/:userId/:productId/text', element: <Text /> },
      { path: '/genvision/:userId/:productId/social-media', element: <SocialMedia /> },
      { path: '/genvision/:userId/:productId/3d-model', element: <Model /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
            <div>
              <ToastContainer position="top-right"
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

// function MeraElement() {
//   const navigate = useNavigate();
//   return (
//     <div className="dark:bg-blue-500 flex-1 h-full flex p-4 justify-center items-center">
//       <button
//         type="button"
//         className="p-2 px-4 m-1 mx-4 rounded bg-blue-400 text-white"
//         onClick={() => navigate('/upload')}
//       >
//         Go to upload
//       </button>
//     </div>
//     // <Dashboard />
//   );
// }
