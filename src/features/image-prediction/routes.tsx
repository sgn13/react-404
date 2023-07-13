import { Outlet } from "react-router-dom";
import app from "src/constants/app";
import ImagePrediction from "src/features/image-prediction/index";

import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedImagePrediction = withProtectedSidebar(withProtectedRoute(ImagePrediction));

export default [
  {
    title: "ImagePrediction",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.predict.image,
    element: <Outlet />,

    children: [
      {
        title: "ImagePrediction",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedImagePrediction allowAccessTo={[]} sidebarType="index" />,
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
