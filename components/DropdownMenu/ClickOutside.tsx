import useEventListener from "hooks/useEventListener/useEventListener";
import { useRef } from "react";

function ClickOutside({ children, open, onClickOutside, closeOnOutsideClick }) {
  const containerRef = useRef();

  const handleOutsideClick = (event) => {
    if (open && containerRef.current && !containerRef.current.contains(event.target)) {
      onClickOutside();
    }
  };

  if (closeOnOutsideClick) useEventListener("click", handleOutsideClick);

  return children({ containerRef });
}

export default ClickOutside;
