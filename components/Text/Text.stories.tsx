import { storiesOf } from "@storybook/react";
import { MdError } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import Text from "./Text";

storiesOf("Components/Text", module)
  .add("Text", () => <Text>Hello World</Text>)
  .add("Label", () => <Text textType="label">Hello World</Text>)
  .add("Error", () => (
    <Text textType="error" size="sm" icon={<MdError />}>
      Hello World
    </Text>
  ))
  .add("Help", () => (
    <Text textType="help" size="lg" icon={<BiHelpCircle />}>
      Hello World
    </Text>
  ));
