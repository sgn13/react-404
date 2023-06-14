import { storiesOf } from "@storybook/react";
import Button from "../../src/components/Button/Button";
import ButtonGroup from "./ButtonGroup";

storiesOf("Components/ButtonGroup", module).add("Demo", () => (
  <ButtonGroup title="Legend" width="fit-content" legendBorderColor="black" legendTextColor="red">
    <Button size="sm">Cancel</Button>
    <Button size="sm">Okay</Button>
  </ButtonGroup>
));
