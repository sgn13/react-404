import E404 from "src/features/errors/E404";

import { Outlet } from "react-router-dom";
// import routes
import controllerRoutes from "src/features/configuration/controllers/routes";
import exclusionRoutes from "src/features/configuration/exclusions/routes";
import libraryRoutes from "src/features/configuration/libraries/routes";
import placementRoutes from "src/features/configuration/placement/routes";
import fileUploadRoutes from "src/features/data/file-upload/routes";
import imageRoutes from "src/features/data/image/routes";
import environmentRoutes from "src/features/environment/routes";
import featureEngineeringRoutes from "src/features/feature-engineering/routes";
import finetuneRoutes from "src/features/finetune/routes";
import modelRoutes from "src/features/model/routes";
import predictRoutes from "src/features/predict/routes";
import folderRoutes from "src/features/source/folder/routes";
import streamingRoutes from "src/features/source/streaming/routes";
import trainRoutes from "src/features/train/routes";

import { Login } from "src/features/auth";
import Index from "src/features/dashboard/index";

import app from "src/constants/app";
import Layout from "src/containers/Layout";
import dataRoutes from "src/features/data/routes";
import E400 from "src/features/errors/E400";
import E401 from "src/features/errors/E401";
import E403 from "src/features/errors/E403";
import E500 from "src/features/errors/E500";
import E503 from "src/features/errors/E503";
import ReactError from "src/features/errors/ReactError";
import UnderConstruction from "src/features/errors/under-construction";
import withAuth from "src/hoc/withAuth";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const OutletWithAuth = withAuth(Outlet);
const OutletWithSidebar = withProtectedSidebar(Outlet);
const LayoutWithSidebar = withProtectedSidebar(Layout);
const IndexWithAuthAndSidebar = withProtectedSidebar(withAuth(Index));
const LayoutWithProtectedSidebar = withProtectedSidebar(Layout);

// Non-Layout Routes: Pages which are rendered outside Layout components
const authRoutes = [
  { path: app.auth.login, element: <Login /> },
  { path: app.auth.register, element: <div>Register</div> },
  { path: app.auth.forgotPassword, element: <div>Forgot Password</div> },
  { path: app.auth.resetPassword, element: <div>Reset Password</div> },
];

// Layout routes: Pages which are rendered inside Layout components

const indexRoutes = [
  {
    path: "/",
    element: <IndexWithAuthAndSidebar />,
  },
];

const errorRoutes = [
  {
    element: <OutletWithSidebar />,
    children: [
      { path: "/bad-request", element: <E400 /> },
      { path: "/unauthorized", element: <E401 /> },
      { path: "/forbidden", element: <E403 /> },
      { path: "/server-error", element: <E500 /> },
      { path: "/service-unavailable", element: <E503 /> },
      { path: "/under-construction", element: <UnderConstruction /> },
      { path: "/react-error", element: <ReactError /> },
      { path: "*", element: <E404 /> },
    ],
  },
];

const routes = [
  ...authRoutes,
  {
    element: (
      <LayoutWithProtectedSidebar>
        <OutletWithAuth redirectTo="/login" />
      </LayoutWithProtectedSidebar>
    ),
    errorElement: () => <div>Encountered route error</div>,
    children: [
      ...indexRoutes,
      ...libraryRoutes,
      ...controllerRoutes,
      ...placementRoutes,
      ...exclusionRoutes,
      ...streamingRoutes,
      ...fileUploadRoutes,
      ...folderRoutes,
      ...environmentRoutes,
      ...modelRoutes,
      ...featureEngineeringRoutes,
      ...trainRoutes,
      ...predictRoutes,
      ...finetuneRoutes,
      ...dataRoutes,
      ...imageRoutes,
      ...errorRoutes,
    ],
  },
];

export default routes;
