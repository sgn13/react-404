import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Backdrop from "./Backdrop";
import { Spinner } from "../../animations/CSS/Spinner/Spinner";

storiesOf("Components/Backdrop", module)
  .add("Demo", () => {
    const [open, setOpen] = useState(true);
    return <Backdrop open={open} onClose={() => setOpen((prev) => !prev)} />;
  })
  .add("Spinner", () => {
    const [open, setOpen] = useState(true);
    return (
      <Backdrop
        backdropStyle={{ backgroundColor: "#0000005c" }}
        open={open}
        onClose={() => setOpen((prev) => !prev)}
      >
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner color={"white"} width={"5rem"} />
        </div>
      </Backdrop>
    );
  });
