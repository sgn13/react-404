import DropdownSidebar from "./DropdownSidebar";
import { storiesOf } from "@storybook/react";
import { sidebarItems } from "./data";

storiesOf("Containers/DropdownSidebar", module).add("Demo", () => (
  <DropdownSidebar data={sidebarItems} nodeKey="parent" />
));
