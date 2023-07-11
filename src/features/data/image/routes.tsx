import { Outlet } from "react-router-dom";
import app from "src/constants/app";
// import Annotation from "src/features/data/image/components/annotation/index";
import Annotation from "src/features/data/image/index";

import withProtectedRoute from "src/hoc/withProtectedRoute";
import withProtectedSidebar from "src/hoc/withProtectedSidebar";

const ProtectedAnnotation = withProtectedSidebar(withProtectedRoute(Annotation));

export default [
  {
    title: "Annotation",
    bodyConfig: { use: true, title: true, goBack: false },
    path: app.data.imageAnnotation,
    element: <Outlet />,

    children: [
      {
        title: "Annotation",
        bodyConfig: { use: true, title: true, goBack: false },
        index: true,
        element: <ProtectedAnnotation allowAccessTo={[]} sidebarType="index" />,
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
