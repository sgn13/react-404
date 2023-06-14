import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Folder from "src/features/source/folder/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedFolder = withProtectedSidebar(withProtectedRoute(Folder));

export default [
  {
    title: "Folders",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.source.folder,
    element: <Outlet />,

    children: [
      {
        title: "Folders",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedFolder allowAccessTo={[]} sidebarType="index" />,
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
