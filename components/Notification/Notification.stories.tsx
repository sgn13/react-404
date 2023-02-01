import React from "react";
import { storiesOf } from "@storybook/react";
import Notification, { toast } from "./Notification";
import styled from "styled-components";

const Styles = styled.div``;

storiesOf("Components/Notification", module)
  .add("default", () => {
    return (
      <>
        <button onClick={() => toast("Wow so easy!")}>Notify!</button>
        <Notification
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    );
  })
  .add("Success", () => {
    return (
      <>
        <button
          onClick={() =>
            toast("Wow so easy!", {
              type: "success", // default, info, success, warning, error
              position: "top-right",
            })
          }
        >
          Notify!
        </button>
        <Notification
          customStyle
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    );
  })
  .add("error", () => {
    return (
      <>
        <button
          onClick={() =>
            toast("Wow so easy!", {
              type: "error", // default, info, success, warning, error
              position: "top-right",
            })
          }
        >
          Notify!
        </button>
        <Styles>
          <Notification
            customStyle
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Styles>
      </>
    );
  });
