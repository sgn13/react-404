import { Outlet } from "react-router-dom";
import User from "src/features/User/User";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";
import CreateUpdate from "./CreateUpdate";
import ViewInPage from "./ViewInPage";

const ProtectedUser = withProtectedSidebar(withProtectedRoute(User));

export default [
  {
    title: "User Management",
    bodyConfig: { use: true, title: true, goBack: false },
    path: "user",
    element: <Outlet />,

    children: [
      {
        title: "User Management",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedUser allowAccessTo={[]} sidebarType="index" />,
      },
      {
        title: "Create User",
        bodyConfig: { use: true, title: true, goBack: false },
        path: "create",
        element: <CreateUpdate />,
      },
      {
        title: "Update User",
        bodyConfig: { use: true, title: true, goBack: false },
        path: ":id/update",
        element: <CreateUpdate />,
      },
      {
        title: "View User",
        bodyConfig: { use: true, title: true, goBack: false },
        path: ":id/view",
        element: <ViewInPage />,
      },
    ],
  },
];
