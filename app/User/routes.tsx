import app from "constants/app";
import User from "app/User/Index";
import withSidebar from "hoc/withSidebar";

export default [
  {
    title: "User Management",
    bodyConfig: { use: true, title: true, goBack: false },
    exact: true,
    path: app.desk.user.root(),
    // element: withSidebar({ component: User, permission: [], role: "superuser" }),
    element: <User />,
  },
];
