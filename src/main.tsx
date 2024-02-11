import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from 'react-router-dom';

import { ThemeProvider } from './components/theme-provider.tsx';
import UploadImage from './components/uploadimage.tsx';
import './index.css';
import { BaseLayout } from './layouts';
import EditImage from './components/editimage.tsx';
import Mockup from './components/mockup.tsx';
import Text from './components/text.tsx';
import SocialMedia from './components/socialmedia.tsx';
import Model from './components/3dmodel.tsx';
// import Assets from './components/assets.tsx';
import Prompt from './components/prompt.tsx';
import Login from './components/loginpage.tsx';
import Dashboard from './components/dashboard.tsx';
import LandingPage from './components/landingPage.tsx';
import Pricing from './components/plans-page.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login isOauth={true} />,
  },
  {
    path: '/plans',
    element: <Pricing />,
  },
  {
    path: '/genvision',
    element: <BaseLayout />,
    errorElement: <h1>error insight</h1>,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'upload', element: <UploadImage /> },
      { path: 'edit', element: <EditImage /> },
      {
        path: 'mockup/assets',
        element: <Mockup />,
        children: [{ path: 'prompt', element: <Prompt /> }],
      },
      { path: 'text', element: <Text /> },
      { path: 'social-media', element: <SocialMedia /> },
      { path: '3d-model', element: <Model /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
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
