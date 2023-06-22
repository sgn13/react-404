import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Environment from "src/features/environment/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";
import CreateUpdate from "./CreateUpdate";

const ProtectedEnvironment = withProtectedSidebar(withProtectedRoute(Environment));

export default [
  {
    title: "Environments",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.environment.root,
    element: <Outlet />,

    children: [
      {
        title: "Environments",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedEnvironment allowAccessTo={[]} sidebarType="index" />,
      },
      {
        title: "Create Environment",
        bodyConfig: { use: true, title: true, goBack: false },
        path: "create",
        element: <CreateUpdate />,
      },
      {
        title: "Update Environment",
        bodyConfig: { use: true, title: true, goBack: false },
        path: ":id/update",
        element: <CreateUpdate />,
      },
      // {
      //   title: "View Library",
      //   bodyConfig: { use: true, title: true, goBack: false },
      //   path: ":id/view",
      //   element: <ViewInPage />,
      // },
    ],
  },
];
