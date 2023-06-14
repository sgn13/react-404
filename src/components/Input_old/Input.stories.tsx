import { storiesOf } from "@storybook/react";
import { FaCheckCircle } from "react-icons/fa";
import Input from "./Input";

storiesOf("Components/Input", module)
  .add("Label", () => <Input inputSize="sm" textSize="sm" label="First Name" name="FirstName" />)
  .add("With Icon", () => (
    <Input
      label="Designation"
      name="designation"
      inputSize="sm"
      textSize="sm"
      placeholder="Enter your designation"
      icon={<FaCheckCircle />}
    />
  ))
  .add("Error", () => (
    <Input
      label="Last Name"
      inputSize="md"
      textSize="md"
      name="lastName"
      errors={{ lastName: "Error" }}
    />
  ))
  .add("HelpText", () => (
    <Input
      label="Designation"
      name="designation"
      helpText="Considered as student if left blank"
      inputSize="lg"
      textSize="lg"
      // type="search"
    />
  ));
