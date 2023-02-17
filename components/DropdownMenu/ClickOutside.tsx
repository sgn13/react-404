import useEventListener from "hooks/useEventListener/useEventListener";
import React, { useRef } from "react";

function ClickOutside({ children, onClickOutside, closeOnOutsideClick }) {
  const containerRef = useRef();
  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      onClickOutside();
    }
  };
  if (closeOnOutsideClick) useEventListener("click", handleOutsideClick);

  return children({ containerRef });
}

export default ClickOutside;
