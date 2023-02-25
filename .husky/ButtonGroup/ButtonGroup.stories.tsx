import React from "react";
import { storiesOf } from "@storybook/react";
import ButtonGroup from "./ButtonGroup";
import Button from "../../components/Button/Button";

storiesOf("Components/ButtonGroup", module).add("Demo", () => (
  <ButtonGroup title="Legend" width="fit-content" legendBorderColor="black" legendTextColor="red">
    <Button size="sm">Cancel</Button>
    <Button size="sm">Okay</Button>
  </ButtonGroup>
));
