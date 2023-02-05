import Chat from "pages/Chat";
import E404 from "pages/Errors/E404";
import Unauthorized from "pages/Errors/Unauthorized";
import OwnUserProfile from "pages/MyProfile";
import UserProfile from "pages/UserProfile";
import Users from "pages/Users";
import Index from "pages/index";
import Login from "pages/Auth/Login";
import app from "constants/app";
import userRoute from "app/User/routes";
import { Navigate, Outlet } from "react-router-dom";
import checkPermission from "utils/checkPermission";
import withAuth from "hoc/withAuth";
import withSidebar from "hoc/withSidebar";

export const authRoutes = [{ path: "/login", element: <Login /> }];
export const messageRoutes = [];

const IndexWithAuth = withAuth(Index);

const routes = [
  {
    path: app.desk.welcome,
    element: <IndexWithAuth allowAccessTo={"everyone"} />,
  },
  ...userRoute,
  // {
  //   path: app.desk.user.root(),
  //   element: <Users />,
  //   children: [
  //     { path: ":id", element: <UserProfile /> },
  //     { path: "me", element: <OwnUserProfile /> },
  //   ],Binding element 'permissions' implicitly has an 'any' type.
  // },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "/support/chat", element: <Chat /> },
  { path: "*", element: <E404 /> },
];

export default routes;
