import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Finetune from "src/features/finetune/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedFinetune = withProtectedSidebar(withProtectedRoute(Finetune));

export default [
  {
    title: "Finetune",
    path: app.finetune.root,
    element: <Outlet />,

    children: [
      {
        title: "Finetune",
        index: true,
        element: <ProtectedFinetune allowAccessTo={[]} sidebarType="index" />,
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
