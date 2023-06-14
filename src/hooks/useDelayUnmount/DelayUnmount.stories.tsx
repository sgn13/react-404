import { storiesOf } from "@storybook/react";
import DelayUnmount from "./DelayUnmount";
storiesOf("Hooks/Utils/useDelayUnmount", module).add("Demo", () => (
  <DelayUnmount />
));
