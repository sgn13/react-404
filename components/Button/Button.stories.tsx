import { storiesOf } from "@storybook/react";
import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import Button from "./Button";

storiesOf("Components/Button", module)
  .add("No Icon", () => (
    <Button
      text="Submit"
      size="sm"
      elevation={0}
      color="white"
      onClick={() => {
        console.log("clicked");
      }}
    />
  ))
  .add("Icon", () => (
    <Button
      text="Submit"
      size="xl"
      color="white"
      elevation={4}
      onClick={() => {
        console.log("clicked");
      }}
      icon={<FaCheckCircle />}
    />
  ))
  .add("Menu Button", () => (
    <Button
      text="Menu"
      color="orange"
      onClick={() => {
        console.log("clicked");
      }}
      style={{
        backgroundColor: "black",
      }}
      textStyle={{ fontSize: "3rem" }}
      icon={<FaCheckCircle />}
      dropdown
    />
  ))
  .add("Custom Button without ripple", () => (
    <Button
      onClick={() => {
        console.log("clicked");
      }}
      noRipple
      backgroundColorOnHover="teal"
    >
      <div style={{ color: "white", fontSize: "2rem" }}>Custom Submit</div>
    </Button>
  ))
  .add("LinesOnHover", () => (
    <Button
      text="Submit"
      size="xl"
      color="white"
      elevation={4}
      linesOnHover
      backgroundColor="teal"
      onClick={() => {
        console.log("clicked");
      }}
      icon={<FaCheckCircle />}
    />
  ));
