import React from "react";
import Chip from "./Chip";
import { storiesOf } from "@storybook/react";

storiesOf("Components/Chip", module)
  .add("Outlined", () => <Chip label="Filtered" />)
  .add("Solid", () => (
    <Chip
      label="Searched"
      backgroundColor="#ccc"
      color="white"
      style={{ border: "none" }}
      iconWrapperStyle={{ backgroundColor: "gray", border: "none" }}
    />
  ));
