import app from "constants/app";
import User from "app/User/Index";
import CreateUpdate from "./CreateUpdate";
import ViewInPage from "./ViewInPage";
import withSidebar from "hoc/withSidebar";

export default [
  {
    title: "User Management",
    bodyConfig: { use: true, title: true, goBack: false },
    exact: true,
    path: app.desk.user.root(),
    // element: withSidebar(<User />),
    element: <User />,
  },

  {
    title: "Create User",
    bodyConfig: { use: true, title: true, goBack: false },
    exact: true,
    path: app.desk.user.create(),
    // element: withSidebar({ component: User, permission: [], role: "superuser" }),
    element: <CreateUpdate />,
  },

  {
    title: "Update User",
    bodyConfig: { use: true, title: true, goBack: false },
    exact: true,
    path: app.desk.user.update(":id"),
    // element: withSidebar({ component: User, permission: [], role: "superuser" }),
    element: <CreateUpdate />,
  },

  {
    title: "View User",
    bodyConfig: { use: true, title: true, goBack: false },
    exact: true,
    path: app.desk.user.view(":id"),
    // element: withSidebar({ component: User, permission: [], role: "superuser" }),
    element: <ViewInPage />,
  },
];
