import E404 from "pages/Errors/E404";

import Index from "pages/index";
import Login from "pages/Auth/Login";
import userRoute from "app/User/routes";
import { Outlet } from "react-router-dom";

import withAuth from "hoc/withAuth";
import withProtectedSidebar from "hoc/withProtectedSidebar";
import E403 from "pages/Errors/E403";
import E400 from "pages/Errors/E400";
import E401 from "pages/Errors/E401";
import E500 from "pages/Errors/E500";
import E503 from "pages/Errors/E503";
import ReactError from "pages/Errors/ReactError";
import UnderConstruction from "pages/Errors/under-construction";
import Layout from "containers/Layout";

const OutletWithAuth = withAuth(Outlet);
const OutletWithSidebar = withProtectedSidebar(Outlet);
const IndexWithAuthAndSidebar = withProtectedSidebar(withAuth(Index));

// Non-Layout Routes: Pages which are rendered outside Layout components
const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <div>Register</div> },
  { path: "/forgot-password", element: <div>Forgot Password</div> },
  { path: "/reset-password", element: <div>Reset Password</div> },
];

// Layout routes: Pages which are rendered inside Layout components

const indexRoute = [
  {
    path: "/",
    element: <IndexWithAuthAndSidebar sidebarType="index" />,
  },
];

const errorRoutes = [
  {
    element: <OutletWithSidebar sidebarType="active" />,
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
      <Layout>
        <OutletWithAuth redirectTo="/login" />
      </Layout>
    ),
    errorElement: () => <div>Encountered route error</div>,
    children: [...indexRoute, ...userRoute, ...errorRoutes],
  },
];

export default routes;
