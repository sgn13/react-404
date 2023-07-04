import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Feature from "src/features/feature-engineering/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedFeature = withProtectedSidebar(withProtectedRoute(Feature));

export default [
  {
    title: "Feature",
    path: app.feature.root,
    element: <Outlet />,

    children: [
      {
        title: "Feature",
        index: true,
        element: <ProtectedFeature allowAccessTo={[]} sidebarType="index" />,
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
