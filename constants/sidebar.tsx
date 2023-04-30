import { AiOutlineFile, AiOutlineHome } from "react-icons/ai";
import app from "./app";
import { filterNode, findNode } from "utils/pollyfills";
import { FcFolder } from "react-icons/fc";
import { getNanoID } from "utils/general";

const nodeIcon = <FcFolder size={20} />;
const leafIcon = <AiOutlineFile size={16} />;

Array.prototype.findNode = findNode;
Array.prototype.filterNode = filterNode;

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
    collasped: false,
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
    label: "Adminstrator",
    location: "top",
    path: "",
    role: "user",
    permission: undefined,
    children: [
      {
        icon: <AiOutlineHome />,
        label: "User Management",
        location: "bottom",
        path: app.user.root,
        role: "user",
        permission: undefined,
      },

      {
        icon: <AiOutlineHome />,
        label: "Role Management",
        location: "bottom",
        path: app.role.root,
        role: "user",
        permission: ["kyc.admin"],
      },

      {
        icon: <AiOutlineHome />,
        label: "Permission Management",
        location: "bottom",
        path: app.permission.root,
        role: "user",
        permission: ["kyc.admin"],
      },
    ],
  },
];

export const AdminSidebar = () => [];

export default [];
