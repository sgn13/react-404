import React from "react";
import { storiesOf } from "@storybook/react";
import Center from "./Center";

storiesOf("Containers/Center", module).add("Demo", () => (
  <Center>
    <div>I am centered element</div>
  </Center>
));
