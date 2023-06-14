import { storiesOf } from "@storybook/react";
import * as React from "react";
import PasswordInput from ".";

storiesOf("Password Input", module).add("default", () => {
  return <PasswordInput placeholder="Enter password" />;
});
