import React from "react";
import { storiesOf } from "@storybook/react";
import FormGroup from "./FormGroup";

storiesOf("Components/FormGroup", module).add("Demo", () => (
  <FormGroup
    title="Legend"
    width="fit-content"
    legendBorderColor="black"
    legendTextColor="red"
  >
    <div>I am form wrapper</div>
  </FormGroup>
));
