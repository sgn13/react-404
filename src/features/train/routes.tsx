import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Train from "src/features/train/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedTrain = withProtectedSidebar(withProtectedRoute(Train));

export default [
  {
    title: "Train",
    path: app.train.root,
    element: <Outlet />,

    children: [
      {
        title: "Train",
        index: true,
        element: <ProtectedTrain allowAccessTo={[]} sidebarType="index" />,
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
