import Chat from "pages/Chat";
import E404 from "pages/Errors/E404";
import OwnUserProfile from "pages/MyProfile";
import UserProfile from "pages/UserProfile";
import Users from "pages/Users";
import Index from "pages/index";
import Login from "pages/Auth/Login";
import app from "constants/app";
import userRoute from "app/User/routes";

export const authRoutes = [{ path: "/login", element: <Login /> }];
export const messageRoutes = [];

const routes = [
  {
    path: app.desk.welcome,
    element: <Index />,
  },
  ...userRoute,
  // {
  //   path: app.desk.user.root(),
  //   element: <Users />,
  //   children: [
  //     { path: ":id", element: <UserProfile /> },
  //     { path: "me", element: <OwnUserProfile /> },
  //   ],
  // },
  { path: "/support/chat", element: <Chat /> },
  { path: "*", element: <E404 /> },
];

export default routes;
