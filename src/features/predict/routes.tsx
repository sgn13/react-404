import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import Predict from "src/features/predict/index";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedPredict = withProtectedSidebar(withProtectedRoute(Predict));

export default [
  {
    title: "Predict",
    path: app.predict.root,
    element: <Outlet />,

    children: [
      {
        title: "Predict",
        index: true,
        element: <ProtectedPredict allowAccessTo={[]} sidebarType="index" />,
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
