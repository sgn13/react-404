import { size } from "lodash";
import { filterNode, findNode } from "../../utils/pollyfills";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { AiOutlineFile } from "react-icons/ai";
import React from "react";

const nodeIcon = <FcFolder size={20} />;
const leafIcon = <AiOutlineFile size={16} />;

Array.prototype.findNode = findNode;
Array.prototype.filterNode = filterNode;

export const sidebarItems = [
  {
    id: 1,
    parent: "Product Management",
    collasped: false,
    icon: nodeIcon,
    children: [
      {
        id: 2,
        parent: "Private",
        icon: nodeIcon,
        children: [
          {
            id: 3,
            parent: "Auto Mobiles",
            icon: leafIcon,
          },
          { id: 4, parent: "Real States", icon: leafIcon },
          {
            id: 6,
            parent: "Information",
            icon: nodeIcon,
            children: [
              {
                id: 7,
                parent: "Personal",
                icon: leafIcon,
              },
              { id: 8, parent: "Professional", icon: leafIcon },
            ],
          },
        ],
      },
      {
        id: 9,
        parent: "Public",
        icon: nodeIcon,
        children: [
          { id: 10, parent: "Public 1", icon: leafIcon },
          { id: 11, parent: "Public 2", icon: leafIcon },
          { id: 12, parent: "Public 3", icon: leafIcon },
        ],
      },
    ],
  },
  {
    id: 22,
    parent: "Inventory Management",
    icon: nodeIcon,
    children: [
      { id: 34, parent: "Mobile", icon: leafIcon },
      { id: 35, parent: "Laptop", icon: leafIcon },
    ],
    collasped: true,
  },
  {
    id: 14,
    parent: "Administrator",
    icon: nodeIcon,
    children: [
      {
        id: 16,
        parent: "User management",
        icon: nodeIcon,
        children: [
          { id: 20, parent: "Men", icon: leafIcon },
          { id: 21, parent: "Women", icon: leafIcon },
        ],
      },
      {
        id: 31,
        parent: "Permission management",
        icon: nodeIcon,
        children: [
          { id: 32, parent: "Men", icon: leafIcon },
          { id: 33, parent: "Women", icon: leafIcon },
        ],
      },
    ],
    collasped: true,
  },
  {
    id: 15,
    parent: "Setting",
    icon: nodeIcon,
    children: [
      { id: 18, parent: "Men", icon: leafIcon },
      { id: 19, parent: "Women", icon: leafIcon },
    ],
    collasped: true,
  },
];

const treeData = {
  id: 1,
  parent: "Animals",
  children: [
    {
      id: 2,
      parent: "Domestic",
      children: [
        {
          id: 3,
          parent: "Goat",
        },
        { id: 4, parent: "Cow" },
        { id: 5, parent: "Ox" },
        {
          id: 6,
          parent: "Birds",
          children: [
            {
              id: 7,
              parent: "Pegion",
            },
            { id: 8, parent: "Hen" },
          ],
        },
      ],
    },
    {
      id: 9,
      parent: "Wild",
      children: [
        { id: 10, parent: "Lion" },
        { id: 11, parent: "Tiger" },
        { id: 12, parent: "Deer" },
        { id: 13, parent: "Wolf" },
      ],
    },
  ],
};

// const result = [treeData].findNode((item) => item?.id === 222);
