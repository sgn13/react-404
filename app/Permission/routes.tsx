import Index from "app/Permission/Index";
// import CreateUpdate from "./CreateUpdate";
// import ViewInPage from "./ViewInPage";
import { Outlet } from "react-router-dom";
import withProtectedSidebar from "hoc/withProtectedSidebar";
import withProtectedRoute from "hoc/withProtectedRoute";

const ProtectedPermission = withProtectedSidebar(withProtectedRoute(Index));

export default [
  {
    title: "Permission Management",
    bodyConfig: { use: true, title: true, goBack: false },
    path: "permission",
    element: <Outlet />,

    children: [
      {
        title: "Permission Management",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedPermission allowAccessTo={["kyc.admin"]} sidebarType="index" />,
      },
      // {
      //   title: "Create User",
      //   bodyConfig: { use: true, title: true, goBack: false },
      //   path: "create",
      //   element: <CreateUpdate />,
      // },
      // {
      //   title: "Update User",
      //   bodyConfig: { use: true, title: true, goBack: false },
      //   path: ":id/update",
      //   element: <CreateUpdate />,
      // },
      // {
      //   title: "View User",
      //   bodyConfig: { use: true, title: true, goBack: false },
      //   path: ":id/view",
      //   element: <ViewInPage />,
      // },
    ],
  },
];
