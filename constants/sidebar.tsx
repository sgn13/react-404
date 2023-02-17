import { AiOutlineHome } from "react-icons/ai";
import app from "./app";

export const sidebar = [
  {
    icon: "",
    label: "",
    location: "",
    path: "",
  },
];

// permission:undefined means no restriction. accessible to all
export const IndexSidebar = () => [
  {
    icon: <AiOutlineHome />,
    label: "Welcome",
    location: "top",
    path: app.root,
    role: "user",
    permission: ["kyc.admin"],
  },

  {
    icon: <AiOutlineHome />,
    label: "Live Clients",
    location: "top",
    path: app.liveClients,
    role: "user",
    permission: undefined,
  },

  {
    icon: <AiOutlineHome />,
    label: "Movie Management",
    location: "top",
    path: app.movie.root,
    role: "user",
    permission: undefined,
  },

  {
    icon: <AiOutlineHome />,
    label: "User Management",
    location: "bottom",
    path: app.user.root,
    role: "user",
    permission: undefined,
  },
];

export const AdminSidebar = () => [];

export default [];
