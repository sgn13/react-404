import useEventListener from "hooks/useEventListener/useEventListener";
import React from "react";

const ESCAPE_KEY_CODE = 27;
function Escape({ children, onEscKeyPress }) {
  const handleEscape = (event) => {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      onEscKeyPress();
    }
  };
  if (onEscKeyPress) useEventListener("keydown", handleEscape);
  return children();
}

export default Escape;
