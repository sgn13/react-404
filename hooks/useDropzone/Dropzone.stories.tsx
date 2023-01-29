import React, { useRef, RefObject } from "react";
import { storiesOf } from "@storybook/react";
import ImageInput from "../../../components/ImageInput/ImageInput";

storiesOf("Hooks/DOM/useDropzone", module).add("Demo", () => (
  <ImageInput
    label="Profile Picture"
    name="profile_picture"
    errors={{ profile_picture: "Profile Picture is required field." }}
  />
));
