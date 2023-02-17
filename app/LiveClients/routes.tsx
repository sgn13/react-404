import Index from "app/LiveClients/Index";
// import CreateUpdate from "./CreateUpdate";
// import ViewInPage from "./ViewInPage";
import { Outlet } from "react-router-dom";
import withProtectedSidebar from "hoc/withProtectedSidebar";
import withProtectedRoute from "hoc/withProtectedRoute";

const ProtectedOnlineUser = withProtectedSidebar(withProtectedRoute(Index));

export default [
  {
    title: "Live Clients Management",
    bodyConfig: { use: true, title: true, goBack: false },
    path: "live-clients",
    element: <Outlet />,

    children: [
      {
        title: "Live Clients Management",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedOnlineUser allowAccessTo={["kyc.admin"]} sidebarType="index" />,
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
