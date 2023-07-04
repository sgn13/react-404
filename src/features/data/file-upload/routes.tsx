import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import FileUpload from "src/features/data/file-upload/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedFileUpload = withProtectedSidebar(withProtectedRoute(FileUpload));

export default [
  {
    title: "FileUploads",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.data.fileUpload,
    element: <Outlet />,

    children: [
      {
        title: "FileUploads",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedFileUpload allowAccessTo={[]} sidebarType="index" />,
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
