import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Library from "src/features/configuration/libraries/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedLibrary = withProtectedSidebar(withProtectedRoute(Library));

export default [
  {
    title: "Library",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.configuration.libraries,
    element: <Outlet />,

    children: [
      {
        title: "Library",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedLibrary allowAccessTo={[]} sidebarType="index" />,
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
