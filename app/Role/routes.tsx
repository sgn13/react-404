import Index from "app/Role/Index";
// import CreateUpdate from "./CreateUpdate";
// import ViewInPage from "./ViewInPage";
import { Outlet } from "react-router-dom";
import withProtectedSidebar from "hoc/withProtectedSidebar";
import withProtectedRoute from "hoc/withProtectedRoute";
import CreateUpdateRole from "./CreateUpdateRole";

const ProtectedRole = withProtectedSidebar(withProtectedRoute(Index));

export default [
  {
    title: "Roles Management",
    bodyConfig: { use: true, title: true, goBack: false },
    path: "role",
    element: <Outlet />,

    children: [
      {
        title: "Roles Management",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedRole allowAccessTo={["kyc.admin"]} sidebarType="index" />,
      },
      {
        title: "Create Role",
        bodyConfig: { use: true, title: true, goBack: false },
        path: "create",
        element: <CreateUpdateRole />,
      },
      {
        title: "Update Role",
        bodyConfig: { use: true, title: true, goBack: false },
        path: ":id/update",
        element: <CreateUpdateRole />,
      },
      // {
      //   title: "View User",
      //   bodyConfig: { use: true, title: true, goBack: false },
      //   path: ":id/view",
      //   element: <ViewInPage />,
      // },
    ],
  },
];
