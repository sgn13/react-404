import React from "react";
import { storiesOf } from "@storybook/react";
import FilePreview from "./FilePreview";

storiesOf("Components/FilePreview", module).add("Demo", () => (
  <FilePreview files={[]} />
));
