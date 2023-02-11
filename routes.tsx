import E404 from "pages/Errors/E404";
import Unauthorized from "pages/Errors/Unauthorized";

import Index from "pages/index";
import Login from "pages/Auth/Login";
import userRoute from "app/User/routes";
import { Outlet } from "react-router-dom";

import withAuth from "hoc/withAuth";
import withProtectedSidebar from "hoc/withProtectedSidebar";

const OutletWithAuth = withAuth(Outlet);
const IndexWithAuthAndSidebar = withProtectedSidebar(withAuth(Index));

// Non-Layout Routes: Pages which are rendered outside Layout components
export const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <div>Register</div> },
  { path: "/forgot-password", element: <div>Forgot Password</div> },
  { path: "/reset-password", element: <div>Reset Password</div> },
];

export const messageRoutes = [];

// Layout routes: Pages which are rendered inside Layout components
export const layoutRoutes = [
  {
    path: "/",
    element: <IndexWithAuthAndSidebar sidebarType="index" />,
  },
  {
    element: <OutletWithAuth redirectTo="/login" />,
    children: [...userRoute],
  },

  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <E404 /> },
];
