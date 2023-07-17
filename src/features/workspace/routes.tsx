import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import FileExplorer from "src/features/workspace/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedFileExplorer = withProtectedSidebar(withProtectedRoute(FileExplorer));

export default [
  {
    title: "FileExplorers",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.fileExplorer,
    element: <Outlet />,

    children: [
      {
        title: "FileExplorers",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedFileExplorer allowAccessTo={[]} sidebarType="index" />,
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
