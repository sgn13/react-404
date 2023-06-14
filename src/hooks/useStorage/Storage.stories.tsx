import { storiesOf } from "@storybook/react";
import Storage from "./Storage";

storiesOf("Hooks/State Management/useStorage", module).add(
  "useLocalStorage",
  () => <Storage />
);
