import Chat from "pages/Chat";
import E404 from "pages/errors/E404";
import OwnUserProfile from "pages/MyProfile";
import UserProfile from "pages/UserProfile";
import Users from "pages/Users";
import Index from "./pages/index";

const routes = [
  { path: "/", element: <Index /> },
  {
    path: "users",
    element: <Users />,
    children: [
      { path: ":id", element: <UserProfile /> },
      { path: "me", element: <OwnUserProfile /> },
    ],
  },
  { path: "/support/chat", element: <Chat /> },
  { path: "*", element: <E404 /> },
];

export default routes;
