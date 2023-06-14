import { storiesOf } from "@storybook/react";

storiesOf("Hooks/DOM/useDropzone", module).add("Demo", () => (
  <imgInput
    label="Profile Picture"
    name="profile_picture"
    errors={{ profile_picture: "Profile Picture is required field." }}
  />
));
