import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Streaming from "src/features/source/streaming/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedStreaming = withProtectedSidebar(withProtectedRoute(Streaming));

export default [
  {
    title: "Streamings",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.source.streaming,
    element: <Outlet />,

    children: [
      {
        title: "Streamings",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedStreaming allowAccessTo={[]} sidebarType="index" />,
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
