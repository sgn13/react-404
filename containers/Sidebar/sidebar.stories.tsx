import { storiesOf } from "@storybook/react";
import * as React from "react";
import Sidebar from "./index2";
import { FaRegNewspaper, FaRegSun } from "react-icons/fa";

storiesOf("Sidebar", module).add("default", () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const sidebarItems = [
    { icon: <FaRegNewspaper />, label: "Pages", location: "top", onClick: () => {} },
    { icon: <FaRegSun />, label: "Settings", location: "bottom", onClick: () => {} },
  ];
  return <Sidebar sidebarItems={sidebarItems} collapsed={collapsed} setCollapsed={setCollapsed} />;
});
