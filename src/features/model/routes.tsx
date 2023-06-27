import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Model from "src/features/model/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedModel = withProtectedSidebar(withProtectedRoute(Model));

export default [
  {
    title: "Model",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.configuration.libraries,
    element: <Outlet />,

    children: [
      {
        title: "Model",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedModel allowAccessTo={[]} sidebarType="index" />,
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
