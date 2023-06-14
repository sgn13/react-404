import { storiesOf } from "@storybook/react";
import Chip from "./Chip";

storiesOf("Components/Chip", module)
  .add("Elevated Chip", () => (
    <Chip
      label="Administrator"
      backgroundColor="white"
      color="gray"
      style={{ border: "1px solid #cccccc77" }}
      textStyle={{ fontSize: "1rem" }}
      iconSize={18}
      onDelete={() => console.log("deleted")}
      elevation={0}
    />
  ))
  .add("Cross Icon Styled", () => (
    <Chip
      label="Administrator"
      backgroundColor="white"
      color="gray"
      style={{ border: "1px solid #cccccc77" }}
      textStyle={{ fontSize: "1rem" }}
      iconSize={18}
      onDelete={() => console.log("deleted")}
      elevation={0}
      iconWrapperStyle={{ backgroundColor: "gray" }}
      iconColor="white"
      iconColorOnHover="white"
    />
  ))
  .add("Custom shadow", () => (
    <Chip
      label="Custom shadow"
      backgroundColor="black"
      color="white"
      iconSize={16}
      textStyle={{ fontSize: "1rem" }}
      shadow="0 0 0.5rem rgba(0, 0, 0, 0.3)"
      // iconWrapperStyle={{ backgroundColor: "white" }}
    />
  ))
  .add("No Elevation", () => (
    <Chip
      label="Searched"
      color="black"
      backgroundColor="rgba(255, 180, 0, 0.5)"
      backgroundColorOnHover="transparent"
      iconSize={20}
      iconRight
      style={{ border: "0.5px solid rgba(255, 180, 0, 0.5)" }}
      shadowOnHover="0 0 0.5rem rgba(255, 180, 0, 0.5)"
    />
  ))
  .add("No Elevation", () => (
    <Chip
      label="Searched"
      color="black"
      iconColorOnHover="white"
      backgroundColor="rgba(29, 159, 146, 0.791)"
      iconSize={20}
      iconRight
      iconColor="white"
      textStyle={{ color: "white" }}
    />
  ));
