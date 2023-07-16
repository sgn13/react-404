import { uniqueId } from "lodash";
import { AiOutlineFile } from "react-icons/ai";
import { FcFolder } from "react-icons/fc";
import AiModel from "src/assets/icons/sidebar/ai.png";
import Source from "src/assets/icons/sidebar/source.png";

import { filterNode, findNode } from "src/utils/pollyfills";

import app from "./app";

const nodeIcon = <FcFolder size={20} />;
const leafIcon = <AiOutlineFile size={16} />;

Array.prototype.findNode = findNode;
Array.prototype.filterNode = filterNode;

// permission:undefined means no restriction. accessible to all
export const IndexSidebar = () => [
  {
    id: uniqueId(),
    icon: AiModel,
    label: "Dashboard",
    location: "top",
    path: app.root,
    role: "user",
    Permission: undefined,
    collasped: false,
  },
  {
    id: uniqueId(),
    icon: Source,
    label: "Data",
    location: "top",
    path: app.data.root,
    role: "user",
    Permission: undefined,
    collasped: true,
  },

  {
    id: uniqueId(),
    icon: AiModel,
    label: "Feature",
    location: "top",
    path: app.feature.root,
    role: "user",
    Permission: undefined,
    collasped: true,
  },
  {
    id: uniqueId(),
    icon: AiModel,
    label: "AI Model",
    location: "top",
    path: app.model.root,
    role: "user",
    Permission: undefined,
    collasped: false,
  },

  {
    id: uniqueId(),
    icon: AiModel,
    label: "Environment",
    location: "top",
    path: app.environment.root,
    role: "user",
    Permission: undefined,
    collasped: false,
  },

  {
    id: uniqueId(),
    icon: AiModel,
    label: "Train",
    location: "top",
    path: app.train.root,
    role: "user",
    Permission: undefined,
    collasped: false,
  },

  {
    id: uniqueId(),
    icon: AiModel,
    label: "Predict",
    location: "top",
    path: app.predict.root,
    role: "user",
    Permission: undefined,
    collasped: false,
  },

  {
    id: uniqueId(),
    icon: AiModel,
    label: "Finetune",
    location: "top",
    path: app.finetune.root,
    role: "user",
    Permission: undefined,
    collasped: false,
  },

  {
    id: uniqueId(),
    icon: AiModel,
    label: "File Explorer",
    location: "top",
    path: app.fileExplorer,
    role: "user",
    Permission: undefined,
    collasped: false,
  },

  // {
  //   id: uniqueId(),
  //   icon: AiModel,
  //   label: "Image Prediction",
  //   location: "top",
  //   path: app.predict.image,
  //   role: "user",
  //   Permission: undefined,
  //   collasped: false,
  // },

  // {
  //   id: uniqueId(),
  //   icon: Source,
  //   label: "Source",
  //   location: "top",
  //   path: "",
  //   role: "user",
  //   Permission: undefined,
  //   collasped: true,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       icon: Source,
  //       label: "Folder",
  //       location: "top",
  //       path: app.source.folder,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: true,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Source,
  //       label: "File Upload",
  //       location: "top",
  //       path: app.source.fileUpload,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: true,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Source,
  //       label: "Streaming",
  //       location: "top",
  //       path: app.source.streaming,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: true,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Source,
  //       label: "DB Pull",
  //       location: "top",
  //       path: app.source.dbPull,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: true,
  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   icon: Feature,
  //   label: "Securement",
  //   location: "top",
  //   path: app.root,
  //   role: "user",
  //   Permission: undefined,
  //   collasped: false,
  // },
  // {
  //   id: uniqueId(),
  //   icon: Configuration,
  //   label: "Configuration",
  //   location: "top",
  //   path: "",
  //   role: "user",
  //   Permission: undefined,
  //   collasped: true,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       icon: Configuration,
  //       label: "Library",
  //       location: "top",
  //       path: app.configuration.libraries,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: true,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Configuration,
  //       label: "Controllers",
  //       location: "top",
  //       path: app.configuration.controllers,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: true,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Configuration,
  //       label: "Placement",
  //       location: "top",
  //       path: app.configuration.placement,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: true,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Configuration,
  //       label: "Exclusion",
  //       location: "top",
  //       path: app.configuration.exclusion,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: true,
  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   icon: AiModel,
  //   label: "AI Model",
  //   location: "top",
  //   path: "",
  //   role: "user",
  //   Permission: undefined,
  //   collasped: true,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       icon: Feature,
  //       label: "Active Model & History",
  //       location: "top",
  //       path: app.aiModel.history,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: false,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Feature,
  //       label: "Model Py*",
  //       location: "top",
  //       path: app.aiModel.modelPy,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: false,
  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   icon: Settings,
  //   label: "Settings",
  //   location: "top",
  //   path: "",
  //   role: "user",
  //   Permission: undefined,
  //   collasped: true,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       icon: Settings,
  //       label: "Users",
  //       location: "top",
  //       path: app.settings.users,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: false,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Settings,
  //       label: "Roles",
  //       location: "top",
  //       path: app.settings.roles,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: false,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Settings,
  //       label: "Access",
  //       location: "top",
  //       path: app.settings.access,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: false,
  //     },
  //     {
  //       id: uniqueId(),
  //       icon: Settings,
  //       label: "Logs",
  //       location: "top",
  //       path: app.settings.logs,
  //       role: "user",
  //       Permission: undefined,
  //       collasped: false,
  //     },
  //   ],
  // },
];

export const AdminSidebar = () => [];

export default [];
