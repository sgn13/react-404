import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Controllers from "src/features/configuration/controllers/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedController = withProtectedSidebar(withProtectedRoute(Controllers));

export default [
  {
    title: "Controllers",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.configuration.controllers,
    element: <Outlet />,

    children: [
      {
        title: "Controllers",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedController allowAccessTo={[]} sidebarType="index" />,
      },
      // {
      //   title: "Create Library",
      //   bodyConfig: { use: true, title: true, goBack: false },
      //   path: "create",
      //   element: <CreateUpdate />,
      // },
      // {
      //   title: "Update Library",
      //   bodyConfig: { use: true, title: true, goBack: false },
      //   path: ":id/update",
      //   element: <CreateUpdate />,
      // },
      // {
      //   title: "View Library",
      //   bodyConfig: { use: true, title: true, goBack: false },
      //   path: ":id/view",
      //   element: <ViewInPage />,
      // },
    ],
  },
];
