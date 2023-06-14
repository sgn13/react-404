import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Exclusion from "src/features/configuration/exclusions/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedExclusion = withProtectedSidebar(withProtectedRoute(Exclusion));

export default [
  {
    title: "Exclusion",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.configuration.exclusion,
    element: <Outlet />,

    children: [
      {
        title: "Exclusion",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedExclusion allowAccessTo={[]} sidebarType="index" />,
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
