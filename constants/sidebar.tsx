import { AiOutlineHome } from "react-icons/ai";
import React from "react";
import app from "./app";

export const sidebar = [
  {
    icon: "",
    label: "",
    location: "",
    path: "",
  },
];

export const IndexSidebar = () => [
  {
    icon: <AiOutlineHome />,
    label: "Welcome",
    location: "top",
    path: app.desk.welcome,
    role: "user",
    permission: [],
  },

  {
    icon: <AiOutlineHome />,
    label: "Dashboard",
    location: "top",
    path: app.desk.root,
    role: "user",
    permission: [],
  },

  {
    icon: <AiOutlineHome />,
    label: "User Management",
    location: "bottom",
    path: app.desk.user.root(),
    role: "user",
    permission: [],
  },

  {
    icon: <img src={require("../assets/icons/logout.svg")} alt="logout" width={20} />,
    label: "Logout",
    location: "bottom",
    path: "/logout",
    role: "user",
    permission: [],
  },
];

export const AdminSidebar = () => [];

export default [];
