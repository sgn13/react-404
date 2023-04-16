import React, { useState } from "react";
import ShowWithAnimation from "../../../containers/ShowWithAnimation/ShowWithAnimation";

function DelayUnmount() {
  const [isMounted, setIsMounted] = useState(false);
  return (
    <>
      <button onClick={() => setIsMounted(!isMounted)}>
        Show/Hide With Animation
      </button>
      <ShowWithAnimation isMounted={isMounted}>
        <h1>Hello World</h1>
      </ShowWithAnimation>
    </>
  );
}

export default DelayUnmount;
