import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Placement from "src/features/configuration/placement/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedPlacement = withProtectedSidebar(withProtectedRoute(Placement));

export default [
  {
    title: "Placement",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.configuration.placement,
    element: <Outlet />,

    children: [
      {
        title: "Placement",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedPlacement allowAccessTo={[]} sidebarType="index" />,
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
